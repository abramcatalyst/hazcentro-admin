import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import PaymentGreen from "src/assets/images/payment-green.png";
import PaymentRed from "src/assets/images/payment-red.png";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import PreviewPayoutDialog from "./PreviewPayoutDialog";
import { PayoutType } from "src/types/followers";

type PayoutCardProps = {
  data: PayoutType;
  handleOpenDialog: (data: PayoutType) => void;
};

const tempAgents: PayoutType[] = [
  { name: "Pi Colines", transactionType: "payout", state: "Lagos" },
  { name: "John Colines", transactionType: "payout", state: "Lagos" },
  { name: "Tasha Philip", transactionType: "credit", state: "Abuja" },
  { name: "Sarah Colines", transactionType: "credit", state: "Lagos" },
  { name: "Sam Doe", transactionType: "payout", state: "Lagos" },
];

const PayoutCard = ({ data, handleOpenDialog }: PayoutCardProps) => {
  const navigate = useNavigate();
  const { name, transactionType } = data;

  const handleViewProfile = () => {
    navigate(`${ADMIN_ROUTE_LINKS.ADMIN_AGENT_PROFILE}/1234`);
  };
  return (
    <Box
      sx={{
        p: 1,
        display: "flex",
        alignItems: "center",
        gap: 1,
        borderRadius: "12px",
      }}
    >
      <Box>
        <img
          src={transactionType === "credit" ? PaymentGreen : PaymentRed}
          alt={name}
          style={{ width: "56px", height: "56px", cursor: "pointer" }}
          onClick={() => {
            handleViewProfile();
          }}
        />
      </Box>
      <Box>
        <Chip
          size="small"
          label={transactionType}
          sx={{
            background: transactionType === "credit" ? "#47B48E0D" : "#000000",
            color:
              transactionType === "credit"
                ? GLOBAL_COLORS.GREEN_MAIN
                : GLOBAL_COLORS.PRIMARY_MAIN,
            fontSize: "10.5px",
            height: "21px",
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            p: 0,
          }}
        />

        <Typography sx={{ fontWeight: 600, fontSize: "15px" }}>
          &#8358;{currencyFormater(404500, 2)}
        </Typography>

        <Typography sx={{ fontSize: "11px" }}>Oriano Nig Plc.</Typography>
      </Box>
      <Box sx={{ ml: "auto" }}>
        <Button
          variant="text"
          size="small"
          color="inherit"
          onClick={() => {
            handleOpenDialog(data);
          }}
        >
          Receipt
        </Button>
      </Box>
    </Box>
  );
};
const RecentPayoutTable = () => {
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<PayoutType | null>(null);
  const handleOpenPreviewDialog = (data: PayoutType) => {
    setOpenPreviewDialog(true);
    setSelectedPayout(data);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
    setSelectedPayout(null);
  };
  return (
    <Box sx={{ background: "#ffffff", mb: 1, p: 1, borderRadius: "24px" }}>
      {openPreviewDialog && selectedPayout && (
        <PreviewPayoutDialog
          open={openPreviewDialog}
          data={selectedPayout}
          handleClose={handleClosePreviewDialog}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
          mb: 0.5,
        }}
      >
        <ProfileTitle text="Recent Payout" />
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </Box>
      <Box sx={{ mb: 1, px: 1 }}>
        <FormControl fullWidth size="small">
          <OutlinedInput
            placeholder="Search for info, data..."
            startAdornment={<SearchRoundedIcon />}
          />
        </FormControl>
      </Box>
      {tempAgents.map((row) => (
        <PayoutCard data={row} handleOpenDialog={handleOpenPreviewDialog} />
      ))}
    </Box>
  );
};

export default RecentPayoutTable;
