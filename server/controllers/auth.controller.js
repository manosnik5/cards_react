import { client } from "../connection.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) return res.status(400).json({ message: 'No such user' });

    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    
    if (!doesPasswordMatch) return res.status(400).json({ message: 'Wrong password' });

    const token = jwt.sign(
      { 
        userId: user.userid,
        username: user.username,
        role: user.role
       }, 
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    
    const { password: _, ...userData } = user;

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: userData
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error processing the request', error: err.message });
  }
};


export const register = async (req, res, next) => {
    try {
    const { username, email, password } = req.body;

    const existingUser = await client.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUsers = await client.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const userId = newUsers.rows[0].userid;

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
                user: newUsers[0]
            }
        })

  } catch (err) {
    res.status(500).send('Error inserting data: ' + err.message);
  }
}

