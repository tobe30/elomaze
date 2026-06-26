import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data
    } catch (error) {
        console.log("Error in getAuthUser", error);
        return null
    }
}


export const signup = async (registerData) => {
    const response = await axiosInstance.post("/auth/register", registerData);
    return response.data;
};

export const login = async (loginData)=> {
    const response = await axiosInstance.post("/auth/login", loginData);
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await axiosInstance.put(`/user/update`, profileData);
  return res.data;
}


