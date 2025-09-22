import { Outlet, useNavigate } from "react-router-dom"
import { Navbar } from "../components/NavBar"
import { Footer } from "../components/Footer"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { authAction } from "../store/authSlice";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { userLogout } from "../store/customActions";
import axios from "../apis/axiosApi";

export const RootLayout = () => {
    const token = useSelector(state => state.auth.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRefreshToken = async () => {

            try {
                const response = await axios.get("/auth/refresh");
                // console.log("home refrsh token response", response.data)
                dispatch(authAction.setAuthToken({ token: response.data.token, userId: response.data.user_id, role: response.data.role }));

            } catch (error) {
                console.log("home refresh token fetch error", error);
                dispatch(userLogout());
                navigate("/auth/login");
            }
        }
        if (!token) {
            fetchRefreshToken();
        }
    }, [token, navigate, dispatch])

    if (!token) {
        return (
            <LoadingSpinner />
        )
    }


    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    )
}
