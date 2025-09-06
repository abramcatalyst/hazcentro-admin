import { useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import navigation from "./navigation";
// import RequireAuth from "src/components/auth/RequireAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useIsUserAuthorized from "src/hooks/useIsUserAuthorized";
import {
  GLOBAL_COLORS,
  removeTokenFromStorage,
  getAuthToken,
  getProfileFromStorage,
  isAuthTokenExpired,
} from "src/utils";
import { FiLogOut } from "react-icons/fi";
import { ADMIN_ROUTE_LINKS, GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";
import useAuthStore from "src/store/authStore";
import { useMediaQuery, useTheme } from "@mui/material";

export default function AppNavigation({
  open,
  handleDrawerClose,
}: {
  open: boolean;
  handleDrawerClose: () => void;
}) {
  const { isAuthorized } = useIsUserAuthorized();
  const { profile, handleLogout, handleLogin } = useAuthStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    const token = getAuthToken();

    if (!token || isAuthTokenExpired()) {
      removeTokenFromStorage();
      navigate(`${GLOBAL_ROUTE_LINKS.LOGIN}?prevPath=${pathname}`);
    }
    if (token && !isAuthTokenExpired()) {
      const fetchedProfile = getProfileFromStorage();
      if (fetchedProfile) {
        const parsedData = JSON.parse(fetchedProfile);
        if (fetchedProfile) {
          handleLogin({ userProfile: parsedData });
        }
        if (parsedData?.role && parsedData?.role === "admin") {
          navigate(ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW);
        }
      }
    }
  }, [isAuthTokenExpired]);
  // useEffect(() => {

  const isLinkActive = (link: string): boolean => {
    const count = pathname?.split("/")?.length;
    if (count >= 4) {
      return pathname?.includes(link) ? true : false;
    } else {
    }
    const res = link === pathname;
    if (res) {
      return true;
    }
    return false;
  };

  const handleLogoutUser = () => {
    handleLogout();
    removeTokenFromStorage();
    navigate(GLOBAL_ROUTE_LINKS.LOGIN);
  };

  const allowAdmin = (value: string): boolean => {
    if (value === "") {
      return true;
    }
    return isAuthorized(value);
  };

  const primarySubTypographyStyles = {
    fontSize: "13px",
    fontWeight: 400,
  };
  const headerKindStyles = {
    fontSize: "12px",
    fontWeight: 500,
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "hidden",
        width: { xs: "240px", sm: "auto" },
      }}
    >
      <Box sx={{ pl: 3, py: 1, background: GLOBAL_COLORS.GREY_50 }}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Avatar src="AD" sx={{ width: "34px", height: "34px" }} />
          <Box sx={{ width: `calc(100% - 38px)` }}>
            <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
              {profile?.name || ""}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
              {profile?.email || ""}
            </Typography>
          </Box>
        </Box>

        {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton> */}
      </Box>
      <List sx={{ background: GLOBAL_COLORS.GREY_50, px: 0.5, height: "100%" }}>
        {navigation.map((row) => (
          <ListItem key={row?.id} disablePadding sx={{ display: "block" }}>
            {row?.kind === "divider" ? (
              <Divider />
            ) : row?.kind === "header" && open ? (
              <ListItemText
                secondary={row?.title}
                secondaryTypographyProps={headerKindStyles}
                sx={{ ml: 3 }}
              />
            ) : (
              <>
                {allowAdmin(row?.permission) && (
                  <ListItemButton
                    sx={[
                      {
                        minHeight: open ? 40 : 0,
                        px: 2.5,
                        mb: 0.5,
                        borderLeft:
                          row?.url && isLinkActive(row?.url)
                            ? `4px solid ${GLOBAL_COLORS.GREEN_MAIN}`
                            : "default",
                        color:
                          row?.url && isLinkActive(row?.url)
                            ? GLOBAL_COLORS.GREEN_MAIN
                            : "default",
                        borderRadius: "0px",
                        justifyContent: open ? "initial" : "center",
                      },
                    ]}
                    onClick={() => {
                      if (row?.url) {
                        navigate(row?.url);
                        if (matches) {
                          handleDrawerClose();
                        }
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        justifyContent: "center",
                        color:
                          row?.url && row?.url?.includes(pathname)
                            ? GLOBAL_COLORS.GREEN_MAIN
                            : "default",
                        mr: open ? 3 : "auto",
                      }}
                    >
                      {row?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={row?.title}
                      primaryTypographyProps={primarySubTypographyStyles}
                      sx={{
                        opacity: open ? 1 : 0,
                      }}
                    />
                  </ListItemButton>
                )}
              </>
            )}
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={[
              {
                minHeight: open ? 40 : 0,
                px: 2.5,
                mb: 0.5,
                borderLeft: "default",
                color: "default",
                borderRadius: "0px",
                justifyContent: open ? "initial" : "center",
              },
            ]}
            onClick={() => {
              handleLogoutUser();
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                justifyContent: "center",
                color: "default",
                mr: open ? 3 : "auto",
              }}
            >
              <FiLogOut />
            </ListItemIcon>
            <ListItemText
              primary={"Logout"}
              primaryTypographyProps={primarySubTypographyStyles}
              sx={{
                opacity: open ? 1 : 0,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
