import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useTheme } from "@mui/material/styles";
import { UserType } from "src/types/users";
import { useNavigate } from "react-router-dom";
import renderUserProfileImage from "src/utils/renderUserProfileImage";

type Props = {
  data: UserType;
};
const UserHeader = ({ data }: Props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userImage = renderUserProfileImage({
    remoteImageUrl: data?.profile_picture_url || "",
    gender: data?.gender,
  });
  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        borderRadius: "12px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        mb: 2,
        width: "100%",
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ChevronLeftRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Box sx={{ borderRadius: "50%", width: "45px", height: "45px" }}>
          <img
            alt="user"
            src={userImage}
            style={{
              objectFit: "cover",
              overflow: "hidden",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            {data?.name}
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "12px",

              color: theme.palette.grey[800],
            }}
          >
            User ID: {data?.unique_user_id}
          </Typography>{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default UserHeader;
