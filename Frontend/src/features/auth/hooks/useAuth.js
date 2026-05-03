import { useDispatch } from "react-redux";
import { getMeApi, loginApi, registerApi } from "../services/auth.api.js";
import { setLoading, setUser } from "../State/authSlice.js";

const useAuth = () => {

    const dispatch = useDispatch();

    const { user, setUser, Loading, setLoading } = useContext(UserContext);

    const registerHandler = async ({ username, email, password, organizationName }) => {
        try {
            const userData = await registerApi({ username, email, password, organizationName });
            dispatch(setUser(userData.user));
            dispatch(setLoading(true));
        } catch (error) {
            console.error("Register Error: ", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const loginHandler = async ({ email, password }) => {
        try {

            const userData = await loginApi({ email, password });
            dispatch(setUser(userData.user));
            dispatch(setLoading(true));
        } catch (error) {
            console.error("Login Error: ", error);
        }
        finally {
            dispatch(setLoading(false));
        }
    }

    const getMeHandler = async () => {
        try {
            const userData = await getMeApi();
            dispatch(setLoading(true));
            dispatch(setUser(userData.user));
        } catch (error) {
            return error;
        }
        finally {
            dispatch(setLoading(false));
        }

    }

    return { registerHandler, loginHandler, getMeHandler }
}

export default useAuth
