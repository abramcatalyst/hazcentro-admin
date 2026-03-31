import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { currencyFormater } from "src/utils";
import Logo from "src/assets/images/logo2.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { SubscriptionType } from "src/types/subscription";

type Props = {
  data: SubscriptionType;
};
export const SubscriptionItem = ({ data }: Props) => {
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
          <Typography sx={{ fontSize: "14px", fontWeight: 600 }}>
            {data?.subscription?.name}
          </Typography>
          <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
            Expires at {dayjs(data?.expires_at).format("MMM Do, YYYY")}
          </Typography>{" "}
        </Box>
      </Box>
      <Box sx={{}}>
        <Typography sx={{ fontSize: "13.7px", fontWeight: 600 }}>
          {data?.subscription?.type} | &#8358;
          {currencyFormater(data?.subscription?.price, 2)}
        </Typography>
        <Typography sx={{ fontSize: "14px" }}></Typography>
        <Typography sx={{ fontSize: "12px", fontStyle: "italic" }}>
          Source: {data?.source} | Status: {data?.subscription?.status}
        </Typography>
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
        <ProfileTitle text="History" />
      </Box>

      <Box>
        {/* {headCells.map((row) => {
          return <SubscriptionItem key={row} />;
        })} */}
      </Box>
    </Box>
  );
}

export default SubscriptionTable;
