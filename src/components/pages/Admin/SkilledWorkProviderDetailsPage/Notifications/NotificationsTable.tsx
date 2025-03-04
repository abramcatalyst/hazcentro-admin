import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015

import Logo from "src/assets/images/logo2.png";
import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";
import { IoIosNotificationsOutline } from "react-icons/io";
import { GLOBAL_COLORS } from "src/utils";

dayjs.extend(relativeTime);

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
];

type NotificationItemProps = {
  showUserImg: boolean;
};
export const NotificationItem = ({ showUserImg }: NotificationItemProps) => {
  return (
    <Box
      sx={{
        my: 1,
        background: "#FCFCFD",
        p: 0.5,
        "&:hover": {
          background: "#47B48E0D",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          my: 1,
          p: 0.5,
        }}
      >
        <Box>
          <IoIosNotificationsOutline style={{ fontSize: "1.4rem" }} />
        </Box>

        <Box sx={{}}>
          <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
            Adeyinker send you a work request “Toilet Technical Repair”
          </Typography>
          <Typography sx={{ fontSize: "14px" }}>
            Please, i want to fix my toilet, is licking from a pipe that passes
            ...
          </Typography>
          <Typography sx={{ fontSize: "14px", mt: 0.5 }}>
            Wuse, Garki, Abuja &nbsp; &middot; &nbsp;
            {dayjs().fromNow()}
          </Typography>
        </Box>
      </Box>
      {showUserImg ? (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Box
            sx={{
              border: `2px solid ${GLOBAL_COLORS.GREEN_MAIN}`,
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Logo}
              style={{ objectFit: "contain", width: "98%", height: "98%" }}
              alt="logo"
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Adeyinka Courage
            </Typography>
            <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
              User ID:1234rt587 &nbsp; &middot; &nbsp;
              {"5M away"}
            </Typography>{" "}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

function NotificationsTable() {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1,
        background: "#ffffff",
        py: { xs: 0.5, sm: 3 },
        px: { xs: 0.5, sm: 3 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <ProfileTile text="Notifications" />
      </Box>

      <Box>
        {headCells.map((row, idx) => {
          return <NotificationItem key={row} showUserImg={idx < 2} />;
        })}
      </Box>
    </Box>
  );
}

export default NotificationsTable;
