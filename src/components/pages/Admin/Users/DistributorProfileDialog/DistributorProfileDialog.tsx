import { useEffect } from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import AvatarFemaleImg from "src/assets/images/avatar-female.png";
import AvatarMaleImg from "src/assets/images/avatar-male.png";
import { formatErrorMessage, GLOBAL_COLORS } from "src/utils";
import QuickActions from "./QuickActions";
import ActiveOrders from "./ActiveOrders";
import { MdOutlineStar } from "react-icons/md";
import DistributorStats from "./DistributorStats";
import { UserType } from "src/types/users";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchVendorOverviewData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

dayjs.extend(relativeTime);

type Props = {
  open: boolean;
  selectedUser: UserType;
  handleClose: () => void;
};

function DistributorProfileDialog({ open, selectedUser, handleClose }: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW,
      { selectedUser, open },
    ],
    queryFn: () => fetchVendorOverviewData({ id: selectedUser?.id }),
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_VENDOR_OVERVIEW],
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
  let userImage = AvatarMaleImg;
  if (selectedUser?.gender?.toLowerCase()?.includes("female")) {
    userImage = AvatarFemaleImg;
  }

  if (data) {
    if (data?.profile?.profile_picture_url) {
      userImage = data?.profile?.profile_picture_url;
    }
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
                src={userImage}
                alt="user"
                style={{
                  objectFit: "cover",
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
            <Box>
              <Typography
                noWrap
                sx={{ fontWeigh: 600, fontSize: { xs: "17px", sm: "20px" } }}
              >
                {data?.profile?.name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  // flexDirection: "column",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "GrayText" }} variant="body2">
                  Followers:100.
                </Typography>
                <Box sx={{ display: "flex", gap: 0.1, alignItems: "center" }}>
                  {[...Array(5).keys()].map((x) => (
                    <MdOutlineStar
                      key={x}
                      style={{
                        color:
                          x < 3
                            ? GLOBAL_COLORS.YELLOW_500
                            : theme.palette.grey[500],
                      }}
                    />
                  ))}
                </Box>
              </Box>
              <Typography sx={{ color: "GrayText" }} variant="body2">
                ID:{data?.profile?.unique_user_id}
              </Typography>
            </Box>
          </Box>
          <Box>
            {selectedUser?.last_seen_at ? (
              <Typography sx={{ color: "GrayText" }} variant="body2">
                Last Seen: {dayjs(selectedUser?.last_seen_at).fromNow()}
              </Typography>
            ) : null}
          </Box>
        </Box>

        <DistributorStats data={data} />
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          {data && <ActiveOrders data={data} />}
        </ErrorBoundary>
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
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
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
            Distributor Profile
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
    </Dialog>
  );
}
export default DistributorProfileDialog;
