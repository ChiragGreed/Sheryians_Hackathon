import { getMeApi, loginApi, registerApi } from "../services/auth.api.js";
import { setLoading, setUser } from "../State/authSlice.js";

const useAuth = () => {

    const { user, setUser, Loading, setLoading } = useContext(UserContext);

    const registerHandler = async ({ username, email, password, organizationName }) => {
        try {
            const userData = await registerApi({ username, email, password, organizationName });
            setUser(userData.user);
            setLoading(true);
        } catch (error) {
            console.error("Register Error: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    const loginHandler = async ({ email, password }) => {
        try {

            const userData = await loginApi({ email, password });
            setUser(userData.user);
            setLoading(true);
        } catch (error) {
            console.error("Login Error: ", error);
        }
        finally {
            setLoading(false);
        }
    }

    const getMeHandler = async () => {
        try {
            const userData = await getMeApi();
            setLoading(true);
            setUser(userData.user);
        } catch (error) {
            return error;
        }
        finally {
            setLoading(false);
        }

    }

    return { registerHandler, loginHandler, getMeHandler }
}

export default useAuth
