import useAuthStore from "src/store/authStore";
import rolesPermissions, { adminRoles } from "src/utils/roles-permission";

const useIsUserAuthorized = () => {
  const { profile } = useAuthStore();
  const isAuthorized = (permission: string) => {
    let res = false;
    try {
      let role = "";
      if (profile?.id) {
        role = profile?.role;
      }
      if (!role) {
        return false;
      }
      if (role && role === adminRoles.SUPER_ADMIN) {
        return true;
      }
      const foundRole = rolesPermissions[role];
      if (!foundRole) {
        return false;
      }
      const foundPermission = foundRole.find((role) => role === permission);
      if (!foundPermission) {
        return false;
      } else {
        return true;
      }
    } catch (err) {
      res = false;
      return res;
    }
  };
  return { isAuthorized };
};

export default useIsUserAuthorized;
