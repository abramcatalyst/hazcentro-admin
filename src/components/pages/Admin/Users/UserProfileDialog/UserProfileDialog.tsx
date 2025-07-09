import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AvatarFemale from "src/assets/images/avatar-female.png";
import AvatarMale from "src/assets/images/avatar-male.png";
import { formatErrorMessage, userRoles } from "src/utils";
import QuickActions from "./QuickActions";
import ActiveOrders from "./ActiveOrders";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import { UserType } from "src/types/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSingleUser } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";

type Props = {
  open: boolean;
  selectedUser: UserType;
  handleClose: () => void;
};

const sizing = { xs: 12, sm: 4 };
type InfoBoxProps = {
  title: string;
  value: string;
};
const InfoBox = ({ title, value }: InfoBoxProps) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography sx={{ fontSize: "13px" }}>{title}</Typography>
      <Typography sx={{ fontWeight: 600 }}>{value}</Typography>
    </Box>
  );
};
function UserProfileDialog({ open, selectedUser, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER,
      { selectedUser, open },
    ],
    queryFn: () => fetchSingleUser(selectedUser?.id),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_USER],
      });
    };
  }, []);

  let content = (
    <DialogContent>
      <HalfScreenLoader />
    </DialogContent>
  );

  if (isError) {
    content = (
      <DialogContent>
        <HalfScreenError text={formatErrorMessage(error)} />
      </DialogContent>
    );
  }
  if (data) {
    content = (
      <DialogContent>
        <Box
          component={Paper}
          sx={{
            minHeight: "147px",
            borderRadius: "20px",
            display: "flex",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", sm: "space-between" },
            p: { xs: 1, sm: 2 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: { xs: "46px", sm: "76px" },
                height: { xs: "46px", sm: "76px" },
                borderRadius: "50%",
              }}
            >
              <img
                src={
                  selectedUser?.gender?.toLowerCase()?.includes("female")
                    ? AvatarFemale
                    : AvatarMale
                }
                alt="user"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </Box>
            <Box>
              <Typography
                noWrap
                sx={{ fontWeigh: 600, fontSize: { xs: "17px", sm: "22px" } }}
              >
                {selectedUser?.name}
              </Typography>
              <Typography sx={{ color: "GrayText" }} variant="body2">
                ID:{selectedUser?.unique_user_id}
              </Typography>
              <Typography sx={{ color: "GrayText" }} variant="body2">
                Following:100 Dist.
              </Typography>
            </Box>
          </Box>
          <Typography sx={{ color: "GrayText" }} variant="body2"></Typography>
        </Box>
        <Box sx={{ my: 1 }}>
          <Typography gutterBottom>Basic Information</Typography>
          <Box
            component={Paper}
            sx={{
              my: 1,
              borderRadius: "20px",
              p: { xs: 1, sm: 2 },
              minHeight: "157px",
            }}
          >
            <Grid container spacing={1}>
              <Grid size={sizing}>
                <InfoBox title="Email Address" value={selectedUser?.email} />
              </Grid>
              <Grid size={sizing}>
                <InfoBox title="Gender" value={selectedUser?.gender} />
              </Grid>
              <Grid size={sizing}>
                <InfoBox title="State of Origin" value={selectedUser?.state} />
              </Grid>
              <Grid size={sizing}>
                <InfoBox
                  title="Phone Number"
                  value={selectedUser?.phone_number}
                />
              </Grid>
              {/* {data?.role !== userRoles.WORKER && (
                <Grid size={sizing}>
                  <InfoBox title="Balance" value={currencyFormater(453256)} />
                </Grid>
              )} */}
              {data?.role !== userRoles.WORKER && (
                <Grid size={sizing}>
                  <InfoBox
                    title={
                      selectedUser?.role === userRoles.USER
                        ? "Following"
                        : "Followers"
                    }
                    value={"100"}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
        {data?.role === userRoles.USER ? (
          <ActiveOrders selectedUser={data} />
        ) : null}
        <QuickActions />
        <Divider />
        <Box sx={{ my: 1, display: "flex", gap: 1 }}>
          <Button
            size="large"
            fullWidth
            sx={{
              height: "55px",
              background: theme.palette.grey[100],
              color: "#000000",
              "&:hover": {
                background: theme.palette.grey[800],
                color: "#ffffff",
              },
            }}
          >
            Send Message
          </Button>
          <Button
            size="large"
            fullWidth
            sx={{
              height: "55px",
              background: "#FBF5E3",
              color: "#000000",
              "&:hover": {
                background: theme.palette.error.light,
                color: "#ffffff",
              },
            }}
            onClick={() => {
              navigate(
                `${ADMIN_ROUTE_LINKS.ADMIN_USER_PROFILE}/${selectedUser?.id}`
              );
            }}
          >
            Go to full Profile
          </Button>
        </Box>
      </DialogContent>
    );
  }
  return (
    <StyledDialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="md"
    >
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            px: { xs: 1, sm: 2 },
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "GrayText" }}>
            User Profile
          </Typography>
          <Box
            sx={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#F9E9E3",
              ml: "auto",
            }}
          >
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogActions>
      {content}
    </StyledDialog>
  );
}
export default UserProfileDialog;
