import { client } from "../connection.js";

export const getUserCollection = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const collectionResult = await client.query(
      `SELECT id FROM user_collection WHERE user_id = $1`,
      [userId]
    );

    if (collectionResult.rowCount === 0) {
      return res.status(404).json({ error: "User collection not found" });
    }

    const userCollectionId = collectionResult.rows[0].id;

    await client.query(
      `INSERT INTO user_collection_cards (user_collection_id, cards_id, unlocked)
       SELECT $1, c.id, FALSE
       FROM cards c
       WHERE NOT EXISTS (
         SELECT 1 FROM user_collection_cards ucc
         WHERE ucc.user_collection_id = $1
           AND ucc.cards_id = c.id
       )`,
      [userCollectionId]
    );

    const result = await client.query(
      `SELECT c.*, ucc.unlocked
       FROM user_collection_cards ucc
       JOIN user_collection uc ON ucc.user_collection_id = uc.id
       JOIN cards c ON ucc.cards_id = c.id
       WHERE uc.user_id = $1`,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("getUserCollection error:", err);
    res.status(500).json({ error: "Failed to fetch user collection" });
  }
};