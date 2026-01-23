import { client } from "../connection.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from 'bcrypt';

export const getUsers = async (req, res, next) => {
  try{
    const result = await client.query('SELECT * FROM users')
    
    res.json(result.rows);
  }catch(error){
    res.status(500).send(error.message);
  }
}

export const updateUserRole = async (req, res) => {
  try{
    const {userId} = req.params;
    const {role} = req.body;

    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    } 

    if (req.user.userId === Number(userId) && role !== "Admin"){
       return res.status(403).json({
        message: "You cannot change your own admin role",
      });
    }
  
    const result = await client.query(`UPDATE users SET role = $1 WHERE userid = $2 RETURNING userid, username, email, role`, [role, userId])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User role updated successfully", user: result.rows[0] });
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    const existingUser = await client.query(
      "SELECT userid FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await client.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, hashedPassword, role]
    );

    const userId = newUser.rows[0].userid;

    const token = jwt.sign({userId: userId}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});


    const userCollectionResults = await client.query(
      `INSERT INTO user_collection (user_id) VALUES ($1) RETURNING id`,[userId]
    )

    const collectionId = userCollectionResults.rows[0].id;

    await client.query(
      `INSERT INTO user_collection_cards (user_collection_id, cards_id, unlocked) SELECT $1, id, false FROM cards`,
      [collectionId]
    )

    res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                token,
                user: newUser[0]
            }
        })

  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await client.query(
      "DELETE FROM users WHERE userid = $1 RETURNING *",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
