import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth";
  axios.defaults.withCredentials = true;
export const useAuthStore = create((set)=> ({
    user: null,
    isAuthenticated : false,
    error: null,
    isLoading: false,
    isCheckingAuth : true,
    message: null,

    signUp: async(email,password, name)=>{
        set({isLoading: true, error: null,})
        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name});
            set({user:response.data.user,
                isAuthenticated:true,
                isLoading:false,
                })
        } catch (error) {
            set({error:error.response.data.message || "Error Signing up", isLoading: false});
            throw error;
        }
    },
    LogIn: async (email, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/login`, { email, password });
			set({
				isAuthenticated: true,
				user: response.data.user,
				error: null,
				isLoading: false,
			});
		} catch (error) {
			set({ error: error.response?.data?.message || "Error logging in", isLoading: false });
			throw error;
		}
	},
    verifyEmail: async(code)=>{
        set({isLoading:true,error:null})
        try {
            const response = await axios.post(`${API_URL}/verify-email`,{code})
            set(
                {
                    user:response.data.user,
                    isAuthenticated:true,
                    isLoading:false,
                }
            )
            return response.data;
        } catch (error) {
            set(
                {
                    error: error.response.data.message || "Error in verifying email",
                    isLoading:false,
                }
            )
            throw error;
        }
    },
    checkAuth: async ()=>{
        set({ isCheckingAuth : true, error:null })
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({user:response.data.user, isCheckingAuth:false,isAuthenticated:true})
        } catch (error) {
            set({error:null, isCheckingAuth:false, isAuthenticated:false})
        }
    }
}));