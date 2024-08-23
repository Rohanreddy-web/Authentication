import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5500/api/auth";
axios.defaults.withCredentials = true;
export const useAuthStore = create((set)=> ({
    user: null,
    isAunthenticated : false,
    error: null,
    isLoading:false,
    isCheckingAuth : true,
    message:null,

    signup: async(email,password, name)=>{
        set({isLoading: true, error: null,})
        try {
            const response = await axios.post(`${API_URL}/signup`,{email,password,name});
            set({user:response.data.user,
                isAunthenticated:true,
                isLoading:false,},
                )
        } catch (error) {
            set({error:error.response.data.message || "Error Signing up", isLoading: false,});
            throw error;
        }
    }
}))