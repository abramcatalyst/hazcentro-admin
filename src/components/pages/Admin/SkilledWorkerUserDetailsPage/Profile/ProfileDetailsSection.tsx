import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import { useTheme } from "@mui/material/styles";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
// import QuickActions from "./QuickActions";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { UserType } from "src/types/users";
import renderUserProfileImage from "src/utils/renderUserProfileImage";

type Props = {
  data: UserType;
};
const sizing = { xs: 12, sm: 6, md: 4 };
const ProfileDetailsSection = ({ data }: Props) => {
  const theme = useTheme();
  const userImage = renderUserProfileImage({
    remoteImageUrl: data?.profile_picture_url || "",
    gender: data?.gender,
  });
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
      <Box sx={{ my: 1 }}>
        <ProfileTitle text="Profile Info" />
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
        <Box sx={{}}>
          <img
            alt="user"
            src={userImage}
            style={{
              objectFit: "cover",
              borderRadius: "50%",

              width: "104px",
              height: "104px",
            }}
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
          <Box
            sx={{
              my: 0.4,
              borderRadius: "25px",
              background: theme.palette.grey[200],
              py: 0.3,
              px: 0.7,
            }}
          >
            <Typography
              sx={{
                fontSize: "12px",
                textAlign: "center",
              }}
            >
              {data?.state}, {data?.country}
            </Typography>{" "}
          </Box>{" "}
        </Box>
      </Box>
      <Box my={2}>
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <ProfileInfoBox title="Name" value={data?.name} />
          </Grid>

          <Grid size={sizing}>
            <ProfileInfoBox title="Email Address" value={data?.email} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Phone" value={data?.phone_number} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="Country" value={data?.country} />
          </Grid>
          <Grid size={sizing}>
            <ProfileInfoBox title="State" value={data?.state} />
          </Grid>
        </Grid>
      </Box>
      {/* <QuickActions /> */}
    </Box>
  );
};

export default ProfileDetailsSection;
