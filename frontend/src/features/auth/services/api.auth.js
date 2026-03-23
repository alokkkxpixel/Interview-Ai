import axios from "axios";

export const apiAuth = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URI}/api/auth`,
});

export async function registerUser(username, email, password) {
  try {
    const response = await apiAuth.post("/register", {
      username,
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);

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

    localStorage.setItem("token", response.data.token);
    // localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await apiAuth.post("/logout");
    localStorage.removeItem("token");

    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function getMe() {
  const token = localStorage.getItem("token");

  try {
    const response = await apiAuth.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
