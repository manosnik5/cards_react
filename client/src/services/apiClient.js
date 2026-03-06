import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/v1" : "/api/v1"


    


export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid credentials");
  }
};

export const unlockCards = async (cardId) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(
      `${API_URL}/api/v1/cards/unlockCards`,
      { cardId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    console.error("unlockCards API error:", error.response?.data || error.message);
    throw new Error("Failed to unlock card");
  }
};

export const fetchUserCollection = async () => {
  const token = sessionStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const response = await axios.get(`${API_URL}/collections`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Prepend full API_URL to image
    return response.data.map((card) => ({
      ...card,
      image: card.image.startsWith("http") ? card.image : `${API_URL}/assets/${card.image}`,
    }));
  } catch (error) {
    console.error("fetchUserCollection API error:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCards = async () => {
  try {
    const response = await axios.get(`${API_URL}/cards`);
    return response.data.map((card) => ({
      id: card.id,
      name: card.name,
      type: card.type,
      humanReadableCardType: card.humanreadablecardtype,
      frametype: card.frametype,
      description: card.description,
      race: card.race,
      attack: card.attack,
      defense: card.defense,
      level: card.level,
      attribute: card.attribute,
      rarity: card.rarity,
      set: card.set,
      image: card.image.startsWith("http") ? card.image : `${API_URL}/assets/${card.image}`,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchPacks = async () => {
  try {
    const response = await axios.get(`${API_URL}/packs`);
    return response.data.map((pack) => ({
      packID: pack.id,
      packName: pack.pack_name,
      packImage: pack.pack_image.startsWith("http") ? pack.pack_image : `${API_URL}/assets/${pack.pack_image}`,
      packYear: pack.pack_year,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUsers = async () => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.map((user) => ({
      id: user.userid,
      name: user.username,
      email: user.email,
      role: user.role,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.put(`${API_URL}/users/${userId}/role`, 
      { role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const addUser = async (name, email, password, role) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.post(`${API_URL}/users/`,
      { name, email, password, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};
