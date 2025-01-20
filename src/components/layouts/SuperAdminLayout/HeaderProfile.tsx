import React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PersonAdd from "@mui/icons-material/PersonAdd";
import KeyboardArrowDownAdd from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import DefaultUserImage from "src/assets/images/default-user.png";
import useAuthStore from "src/store/authStore";
import {
  GLOBAL_COLORS,
  reformatRoleName,
  removeTokenFromStorage,
} from "src/utils";
import { useNavigate } from "react-router-dom";
import useAppStore from "src/store/appStore";
import { appPermissions } from "src/utils/permissions";
import useIsUserAuthorized from "src/hooks/useIsUserAuthorized";
import { IoChatbubblesSharp } from "react-icons/io5";
import { LuBell, LuRepeat } from "react-icons/lu";
import { useTheme } from "@mui/material/styles";

export default function HeaderProfile() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { profile, handleLogout } = useAuthStore((state) => state);
  const { handleOpenAdminDialog } = useAppStore((state) => state);
  const { isAuthorized } = useIsUserAuthorized();
  const theme = useTheme();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const renderAdminImage = (): string => {
    return DefaultUserImage;
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          ml: "auto",
          color: "black",
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            background: GLOBAL_COLORS.GREY_50,
            borderRadius: "10px",
            border: `1px solid ${theme.palette.grey[200]}`,
            px: 1,
            py: 0.2,
          }}
        >
          <IconButton>
            <LuBell />
          </IconButton>
          <IconButton>
            <IoChatbubblesSharp />
          </IconButton>
          <IconButton>
            <LuRepeat />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={renderAdminImage()}
            ></Avatar>
          </IconButton>
          <KeyboardArrowDownAdd />
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar src={renderAdminImage()} />{" "}
            <Box>
              <Typography
                variant="subtitle1"
                sx={{ minWidth: 100, textAlign: "left" }}
              >
                {profile?.user?.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ minWidth: 100, fontSize: "13px", textAlign: "left" }}
              >
                {reformatRoleName(profile?.user?.role || "")}
              </Typography>{" "}
            </Box>
          </Box>
        </MenuItem>

        <Divider />
        {isAuthorized(appPermissions.can_create_admin) && (
          <MenuItem
            onClick={() => {
              handleClose();
              handleOpenAdminDialog();
            }}
          >
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another admin account
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleLogout();
            removeTokenFromStorage();
            handleClose();
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
