import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { GLOBAL_COLORS } from "src/utils";
import dayjs from "dayjs";
import CustomTab from "src/components/shared/CustomTab/CustomTab";

type ItemBoxProps = {
  title: string;
  value: string;
  applyColor?: boolean;
};
const DisputeInfoBox = ({ title, value, applyColor }: ItemBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.7,
        alignItems: "center",
        fontSize: "12.5px",
        my: 0.5,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: applyColor ? GLOBAL_COLORS.GREEN_MAIN : "GrayText",
          display: "-webkit-box",
          textOverflow: "ellipsis",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,

          overflow: "hidden",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
const DisputeOverview = () => {
  const handleClick = () => {};
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
        borderRadius: "20px",
        background: "#ffffff",
      }}
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
        <ProfileTitle text="Dispute Overview" />
      </Box>
      <Box>
        <DisputeInfoBox title="Dispute ID:" value="12345" />
        <DisputeInfoBox
          title="Date & Time:"
          value={dayjs().format("MMM DD, YYYY, HH:MMA")}
        />
        <DisputeInfoBox title="Dispute Status:" value="Pending" />
        <DisputeInfoBox title="Case Title:" value="Requesting Refund" />
      </Box>
      <Box sx={{ mt: 3, mb: 1.5 }}>
        <Box sx={{ maxWidth: "100px", mb: 1 }}>
          <CustomTab
            handleClick={handleClick}
            value={"details"}
            title={"Details"}
            active={true}
          />
        </Box>
        <DisputeInfoBox
          title="Summary of Dispute:"
          value="item not as described"
        />

        <DisputeInfoBox title="Item Name:" value="iPhone" />
        <DisputeInfoBox title="Quantity:" value="1" />
        <DisputeInfoBox title="Reported Issues:" value="Damaged Item" />
      </Box>
      <Divider />
      <Box sx={{ mt: 3, mb: 2 }}>
        <DisputeInfoBox title="Buyer:" value="John Doe" />

        <DisputeInfoBox
          title="Buyer Phone Number:"
          value="23487945678"
          applyColor
        />
        <DisputeInfoBox title="Merchant:" value="Orianmo Store" />
        <DisputeInfoBox
          title="Merchant Phone Number:"
          value="23487945678"
          applyColor
        />
      </Box>
      <Box>
        <Button size="small" variant="contained">
          Mark Resolved
        </Button>
      </Box>
    </Box>
  );
};

export default DisputeOverview;
