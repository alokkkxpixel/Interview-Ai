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

<<<<<<< HEAD
    localStorage.setItem("token", response.data.token);

=======
>>>>>>> d19fa1a4f86c8f355f750503a66a16aa70e8c2b9
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

<<<<<<< HEAD
    localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
=======
>>>>>>> d19fa1a4f86c8f355f750503a66a16aa70e8c2b9
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await apiAuth.post("/logout");
<<<<<<< HEAD
    localStorage.removeItem("token");
=======

>>>>>>> d19fa1a4f86c8f355f750503a66a16aa70e8c2b9
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
<<<<<<< HEAD
  const token = localStorage.getItem("token");
  try {
    const response = await apiAuth.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
=======
  try {
    const response = await apiAuth.get("/me");
>>>>>>> d19fa1a4f86c8f355f750503a66a16aa70e8c2b9
    return response.data;
  } catch (error) {
    throw error;
  }
}
