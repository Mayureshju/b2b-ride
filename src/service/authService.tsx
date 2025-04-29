import axios from "axios";
import { BASE_URL } from "./config";
import { resetAndNavigate } from "@/utils/Helpers";
import { Alert } from "react-native";
import { useUserStore } from "@/store/userStore";
import { tokenStorage } from "@/store/storage";
import { useCaptainStore } from "@/store/captainStore";

export const signin = async (payload: {
    role: "customer" | "captain";
    phone: string;
    countryCode: any;
    otp?: string;
}, updateAccessToken: () => void) => {
    const { setUser } = useUserStore.getState();
    const { setUser: setCaptainUser } = useCaptainStore.getState();
    try {
        const res = await axios.post(`${BASE_URL}/auth/signin`, payload);
        if (res.data.user.role === "customer") {
            setUser(res.data.user);
        } else {
            setCaptainUser(res.data.user);
        }
        tokenStorage.set("access_token", res.data.access_token);
        tokenStorage.set("refresh_token", res.data.refresh_token);
        resetAndNavigate("/captain/home");
        updateAccessToken()
    } catch (error: any) {
        Alert.alert("Oh! Dang there was an error");
        console.log("Error: ", error?.response?.data?.msg || "Error signin");
    }
};

export const refresh_tokens = async () => {
    const { clearData } = useUserStore.getState();
    const { clearCaptainData } = useCaptainStore.getState();

    try {
        const refresh_token = tokenStorage.getString("refresh_token");
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refresh_token,
        });
        const new_access_token = response.data.access_token;
        const new_refresh_token = response.data.access_token;
        tokenStorage.set("access_token", new_access_token);
        tokenStorage.set("refresh_token", new_refresh_token);
        return new_access_token;
    } catch (error) {
        console.log("REFRESH TOKEN ERROR");
        clearData();
        clearCaptainData();
        tokenStorage.clearAll();
        resetAndNavigate("/");
    }
};

export const logout = async (disconnect?: () => void) => {
    if (disconnect) {
        disconnect();
    }
    const { clearData } = useUserStore.getState();
    const { clearCaptainData } = useCaptainStore.getState();
    tokenStorage.clearAll();
    clearCaptainData();
    clearData();
    resetAndNavigate("/");
};
