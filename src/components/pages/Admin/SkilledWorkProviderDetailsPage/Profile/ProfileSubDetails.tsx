import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import MaleAvatar from "src/assets/tempimages/user1.png";
import { MdOutlineStar } from "react-icons/md";

const ProfileSubDetails = () => {
  const theme = useTheme();
  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        mb: 1,
        width: "100%",
      }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          flexWrap: "wrap",
          background: "#F7F7F97A",
          py: 2,
          px: 1,
          borderRadius: "20px",
        }}
      >
        <Box sx={{ borderRadius: "50%", width: "104px", height: "104px" }}>
          <img
            alt="user"
            src={MaleAvatar}
            style={{ objectFit: "cover", borderRadius: "50%" }}
          />
        </Box>
        <Box sx={{}}>
          <Typography
            sx={{
              fontSize: "19px",
              fontWeight: 500,
            }}
          >
            Jason Suter
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "12.5px",
              fontWeight: 500,

              color: theme.palette.grey[800],
            }}
          >
            Electrician &middot; 5 Years Exp. 200 Request
          </Typography>{" "}
          <Typography
            sx={{
              fontSize: "12px",

              color: theme.palette.grey[800],
            }}
          >
            User ID: 123457865
          </Typography>{" "}
          <Box
            sx={{
              my: 0.4,
              borderRadius: "25px",
              background: theme.palette.grey[100],
              py: 0.3,
              px: 0.7,
              display: "flex",
              alignItems: "center",
              gap: 0.6,
            }}
          >
            <MdOutlineStar
              style={{
                fontSize: "12px",
                color: `gold`,
              }}
            />
            <Typography
              sx={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              Wuse, Abuja
            </Typography>{" "}
          </Box>{" "}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileSubDetails;
