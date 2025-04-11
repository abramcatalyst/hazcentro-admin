import { useEffect, useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

import HeaderProfile from "./HeaderProfile";
// import RequireAuth from "src/components/auth/RequireAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  GLOBAL_COLORS,
  removeTokenFromStorage,
  getAuthToken,
  getProfileFromStorage,
  isAuthTokenExpired,
} from "src/utils";
import HeaderProfileLeft from "./HeaderProfileLeft";
import { CUSTOMER_ROUTE_LINKS, GLOBAL_ROUTE_LINKS } from "src/utils/routeLinks";
import useAuthStore from "src/store/authStore";
import AppNavigation from "./AppNavigation";
const drawerWidth = 212;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  mt: 14,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  paddingY: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SuperAdminLayout() {
  const [open, setOpen] = useState(true);
  const { handleLogin } = useAuthStore();
  const theme = useTheme();
  const matchesLow = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
        if (parsedData?.role && parsedData?.role === "agent") {
          navigate(CUSTOMER_ROUTE_LINKS.CUSTOMER_OVERVIEW);
        }
      }
    }
  }, [isAuthTokenExpired]);
  // useEffect(() => {
  //   if (!profile?.id) {
  //     navigate(GLOBAL_ROUTE_LINKS.LOGIN);
  //   }
  // }, []);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{
          background: GLOBAL_COLORS.GREY_10,
          px: { xs: 0, sm: 2 },
          py: 1,
          width: { xs: "100%", sm: `calc(100% - ${drawerWidth}px)` },
        }}
        // sx={{ background: theme.palette.common.white }}
        elevation={0}
      >
        <Toolbar sx={{ background: theme.palette.common.white }}>
          <IconButton
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: { xs: "block", sm: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <HeaderProfileLeft />
          <HeaderProfile />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={true}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <AppNavigation open={open} handleDrawerClose={handleDrawerClose} />
      </Drawer>
      {matchesLow ? (
        <MuiDrawer
          anchor={"left"}
          open={open}
          onClose={handleDrawerClose}
          sx={{ display: { xs: "block", sm: "none" } }}
        >
          <Box sx={{ mt: 9 }} />
          <AppNavigation open={open} handleDrawerClose={handleDrawerClose} />
        </MuiDrawer>
      ) : null}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
          px: 2,
          width: "100%",
          overflow: "hidden",
          maxWidth: open ? `calc(100% - ${drawerWidth})` : "100%",
          minHeight: "100vh",
          background: theme.palette.grey[50],
        }}
      >
        <DrawerHeader />
        <>
          {/* {openAdminFormDialog && <AddAdminDialog />} */}

          {/* <RequireAuth>
            <Outlet />
          </RequireAuth> */}
          {/* {children} */}
          <Outlet />
        </>
      </Box>
    </Box>
  );
}
