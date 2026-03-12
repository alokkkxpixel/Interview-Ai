import axios from "axios";

export const apiAuth = axios.create({
  baseURL: "http://localhost:3000/api/auth",
});

export async function registerUser(username, email, password) {
  try {
    const response = await apiAuth.post("/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser(emailorusername, password) {
  try {
    const response = await apiAuth.post("/login", {
      emailorusername,
      password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await apiAuth.post("/logout");

    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const response = await apiAuth.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}
