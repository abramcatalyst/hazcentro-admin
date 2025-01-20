import useAuthStore from "src/store/authStore";
import axios from "src/api/axios";

const useLogout = () => {
  const { handleLogout } = useAuthStore();

  const logout = async () => {
    try {
      await axios.get("/auth/logout", {
        withCredentials: true,
      });
      handleLogout();
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
