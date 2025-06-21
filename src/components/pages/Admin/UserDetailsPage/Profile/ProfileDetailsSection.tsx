import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import MaleAvatar from "src/assets/tempimages/user1.png";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import QuickActions from "./QuickActions";
import { UserType } from "src/types/users";

type Props = {
  data: UserType;
};
const sizing = { xs: 12, sm: 6, md: 6, lg: 4 };
const ProfileDetailsSection = ({ data }: Props) => {
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
      <Box sx={{ my: 3 }}>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 500,
          }}
        >
          Profile Info
        </Typography>{" "}
      </Box>

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
      <Box my={2}>
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <ProfileInfoBox title="Gender" value={data?.gender} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox
              fullValueLength
              title="Email Address"
              value={data?.email || "N/A"}
            />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Country" value={data?.country || "N/A"} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="State" value={data?.state || "N/A"} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Phone" value={data?.phone_number || "N/A"} />
          </Grid>
        </Grid>
      </Box>
      <QuickActions />
    </Box>
  );
};

export default ProfileDetailsSection;
