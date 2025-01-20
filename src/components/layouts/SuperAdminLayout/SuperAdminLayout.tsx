import { useState } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import navigation from "./navigation";
import HeaderProfile from "./HeaderProfile";
// import RequireAuth from "src/components/auth/RequireAuth";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import useIsUserAuthorized from "src/hooks/useIsUserAuthorized";
import { GLOBAL_COLORS } from "src/utils";
import HeaderProfileLeft from "./HeaderProfileLeft";

const drawerWidth = 240;

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
  const { isAuthorized } = useIsUserAuthorized();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  {
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };

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

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

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
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        sx={{ background: GLOBAL_COLORS.GREY_10, px: { xs: 0, sm: 2 }, py: 1 }}
        // sx={{ background: theme.palette.common.white }}
        elevation={0}
      >
        <Toolbar sx={{ background: theme.palette.common.white }}>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <HeaderProfileLeft />
          <HeaderProfile />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Box sx={{ pl: 3, py: 1, background: GLOBAL_COLORS.GREY_50 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Avatar src="AD" sx={{ width: "34px", height: "34px" }} />
            <Box sx={{ width: `calc(100% - 38px)` }}>
              <Typography sx={{ fontSize: "15px", fontWeight: 600 }}>
                Super Admin
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
                superadmin@gmail.com
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
        <List sx={{ background: GLOBAL_COLORS.GREY_50, px: 0.5 }}>
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
        </List>
      </Drawer>
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
