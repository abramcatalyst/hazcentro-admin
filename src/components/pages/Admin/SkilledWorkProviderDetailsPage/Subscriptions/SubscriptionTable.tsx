import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { currencyFormater } from "src/utils";
import Logo from "src/assets/images/logo2.png";
import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
];

const SubscriptionItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        my: 1,
        background: "#F6F6F682",
        p: 0.5,
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <img
          src={Logo}
          style={{ objectFit: "contain", width: "55px", height: "55px" }}
          alt="logo"
        />{" "}
        <Box>
          <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
            Charge Renewal
          </Typography>
          <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
            {dayjs().format("MMM Do, YYYY")}
          </Typography>{" "}
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap" }}
      >
        <Typography sx={{ fontSize: "14px" }}>Payment via card</Typography>
        <Typography sx={{ fontSize: "14px" }}>
          &#8358;{currencyFormater(40000)}
        </Typography>
        <Button size="small" color="success">
          Download Reciept
        </Button>
      </Box>
    </Box>
  );
};

function SubscriptionTable() {
  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        background: "#ffffff",
        py: 1,
        px: { xs: 0.5, sm: 1 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <ProfileTile text="History" />
      </Box>

      <Box>
        {headCells.map((row) => {
          return <SubscriptionItem key={row} />;
        })}
      </Box>
    </Box>
  );
}

export default SubscriptionTable;
