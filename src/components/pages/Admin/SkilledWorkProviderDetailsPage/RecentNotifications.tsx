import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015

import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";
import { IoIosNotificationsOutline } from "react-icons/io";

dayjs.extend(relativeTime);

export type NotificationItemProps = {
  showUserImg: boolean;
};
const NotificationItem = () => {
  return (
    <Box
      sx={{
        my: 0.6,
        background: "#FCFCFD",
        p: 0.1,
        "&:hover": {
          background: "#47B48E0D",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 0.4,
          alignItems: "center",
          my: 0.4,
        }}
      >
        <Box>
          <IoIosNotificationsOutline style={{ fontSize: "1.4rem" }} />
        </Box>

        <Box sx={{}}>
          <Typography sx={{ fontSize: "12px" }}>
            Adeyinker send you a work request “Toilet Technical Repair” Please,
            i want to fix my toilet, is licking from a pipe that passes ...
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
const headCells = ["Order ", "Order ", "Amountf", "Date "];

function RecentNotifications() {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1,
        background: "#ffffff",
        py: { xs: 0.5, sm: 1.3 },
        px: { xs: 0.5, sm: 1.3 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <ProfileTile text="Notifications" />
      </Box>

      <Box>
        {headCells.map((row) => {
          return <NotificationItem key={row} />;
        })}
      </Box>
    </Box>
  );
}

export default RecentNotifications;
