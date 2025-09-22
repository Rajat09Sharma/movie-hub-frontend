
import { useDispatch, useSelector } from "react-redux";
import axios from "../apis/axiosApi";
import { authAction } from "../store/authSlice";

export const useRefreshToken = () => {

    const authToken = useSelector(state => state.auth.token);

    const dispatch = useDispatch();

    const fetchRefreshToken = async () => {
        try {
            const response = await axios.get("/auth/refresh", { withCredentials: true });
            console.log(response.data);
            dispatch(authAction.setAuthToken({ token: response.data.token, userId: response.data.user_id, role: response.data.role }));
            return response.data.token;
        } catch (error) {
            console.log("fetch refresh token error", error);
            return authToken;
        }
    }

    return (
        { refreshToken: fetchRefreshToken }
    )
}
