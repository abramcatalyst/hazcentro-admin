// import React, { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import useAuthStore from "src/store/authStore";
// import { jwtDecode } from "jwt-decode";
// import { IToken } from "src/utils/types";

type Props = {
  children: React.ReactNode;
};
const RequireAuth = ({ children }: Props) => {
  // const { handleLogout, handleLogin, profile } = useAuthStore();
  // const location = useLocation();
  // const navigate = useNavigate();

  // const loadUserData = async () => {
  //   // let decodedToken = jwtDecode<IToken>(token)
  //   const loginUrl = `/login?prevPath=${location.pathname}`;
  //   try {
  //     let token = profile?.accessToken;
  //     if (!token) {
  //       handleLogout();
  //       return navigate(loginUrl);
  //     }

  //     if (token) {
  //       const decodedToken = jwtDecode(token) as IToken;
  //       if (decodedToken) {
  //         handleLogin({ userProfile: decodedToken, accessToken: token });
  //       }
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //     if (error?.message === "Invalid token specified") {
  //       navigate(loginUrl);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   loadUserData();
  // }, [location?.pathname]);

  return <>{children}</>;
};

export default RequireAuth;
