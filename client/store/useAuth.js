import { create } from "zustand";
import axios from "../libs/axios";

const useAuth = create((set, get) => ({
    user: JSON.parse(localStorage.getItem("tempchat")) || null,
    isSigningIn: false,
    isSignup: false,

    signupNow: async (data, showMessage, navigate) => {
        try {
            set({ isSignup: true });
            const res = await axios.post("/auth/signup", data);
            if (!res?.data.success) {
                showMessage(res?.data?.message, false);
                return;
            }
            localStorage.setItem("tempchat", JSON.stringify(res?.data?.user));
            showMessage(res?.data?.message, true);
            setTimeout(() => {
                navigate("/");
                set({ user: res?.data?.user });
            }, 2500);
        } catch (error) {
            showMessage(error?.response?.data?.message, false);
        } finally {
            set({ isSignup: false });
        }
    },
    loginNow: async (data, showMessage, navigate) => {
        try {
            set({ isSigningIn: true });
            const res = await axios.post("/auth/login", data);
            if (!res?.data.success) {
                showMessage(res?.data?.message, false);
                return;
            }
            localStorage.setItem("tempchat", JSON.stringify(res?.data?.user));
            showMessage(res?.data?.message, true);
            setTimeout(() => {
                navigate("/");
                set({ user: res?.data?.user });
            }, 2500);
        } catch (error) {
            showMessage(error?.response?.data?.message, false);
        } finally {
            set({ isSigningIn: false });
        }
    },
    logout: async () => {
        try {
            const res = await axios.post("/logout");
            if (res?.data?.success) {
                localStorage.removeItem("e-com-v-2.0");
                set({ admin: null });
            }
        } catch (error) {
            console.log(error);
        }
    }
}));

export default useAuth;
