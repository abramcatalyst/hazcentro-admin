// import { useState } from "react";
import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import { SlShareAlt } from "react-icons/sl";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { alpha, useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";

import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import dayjs from "dayjs";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import { PendingPayoutType } from "src/types/payout";
// import OrderItemCard from "src/components/shared/OrderItemCard/OrderItemCard";

dayjs.extend(advancedFormat);

type Props = {
  open: boolean;
  selected: PendingPayoutType;
  handleClose: () => void;
};

const UserInfoBox = ({
  title,
  value,
  allowBorder,
}: {
  title: string;
  value: string;
  allowBorder?: boolean;
}) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        borderRight: allowBorder
          ? { xs: "none", sm: `3px solid ${GLOBAL_COLORS.GRAY_800}` }
          : "none",
        borderBottom: allowBorder
          ? { xs: `3px solid ${GLOBAL_COLORS.GRAY_800}`, sm: "none" }
          : "none",
        pr: allowBorder ? { xs: "none", sm: 2 } : "none",
        pb: { xs: 1, sm: 0.4 },
        width: "100%",
      }}
    >
      <Typography sx={{ my: 1, fontWeight: 600, fontSize: "12.5px" }}>
        {title}
      </Typography>
      <Typography
        sx={{ fontSize: { xs: "15px", sm: "18px" }, fontWeight: 700 }}
      >
        {value}
      </Typography>
    </Box>
  );
};

const OtherDetailsInfoBox = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <Box
      sx={{
        textAlign: "left",

        pb: 0.5,
        width: "100%",
        my: 0.7,
      }}
    >
      <Typography sx={{ mb: 0.1, fontWeight: 600, fontSize: "14px" }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
        {value}
      </Typography>
    </Box>
  );
};
function PreviewPendingPayoutDialog({ open, selected, handleClose }: Props) {
  // const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const boxStyles = {
    border: `1.5px dotted ${GLOBAL_COLORS.GREEN_MAIN}`,
    px: 1,
    py: 2,
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  };
  return (
    <StyledDialog
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
            Payout Details
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box sx={{ ...boxStyles, mb: 1 }}>
          <Box>
            <Box
              sx={{
                background:
                  selected?.status == "completed"
                    ? "#47B48E0D"
                    : alpha(theme.palette.error.light, 0.1),
                color:
                  selected?.status == "completed"
                    ? GLOBAL_COLORS.GREEN_MAIN
                    : theme.palette.error.main,
                fontSize: "12.7px",
                height: "26px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "87px",
                p: 0,
                textTransform: "capitalize",
              }}
            >
              {selected.status}
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: "22px", mt: 1 }}>
              &#8358;{currencyFormater(selected?.amount, 2)}
            </Typography>

            <Box>
              <Typography
                sx={{ fontWeight: 500, lineHeight: "100%", fontSize: "13px" }}
              >
                {dayjs(selected?.created_at).format(
                  "dddd, MMM Do YYYY | H:m A"
                )}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              background: theme.palette.warning.light,
              color: "#ffffff",
              borderRadius: "5px",
              width: "138px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 0.3,
            }}
          >
            <Typography sx={{ fontSize: "13px", textTransform: "uppercase" }}>
              {selected?.type}
            </Typography>
          </Box>
        </Box>
        {/* <Box sx={{ my: 1 }}>
          <Button
            size="large"
            fullWidth
            startIcon={<SlShareAlt />}
            sx={{ background: theme.palette.grey[100], color: "#000000" }}
          >
            Download
          </Button>
        </Box> */}
        <Box sx={boxStyles}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            {/* <UserInfoBox title="Buyer" value="Ismialia Bello" allowBorder />
            <UserInfoBox title="Agent" value="Wal Yaks" allowBorder />
            <UserInfoBox title="Seller (Merchant)" value="Oriano Nigeria" /> */}
            <UserInfoBox
              title="User"
              value={selected?.wallet?.user?.name}
              allowBorder
            />

            <UserInfoBox
              title="User ID"
              value={selected?.wallet?.user?.unique_user_id}
            />
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Other details
          </Typography>
          <Box>
            {/* <OtherDetailsInfoBox
              title="Beneficiary"
              value="Transfer-Hazcentro | 2345689709"
            />
            <Divider />
            <OtherDetailsInfoBox
              title="Beneficiary Account"
              value="2345689709"
            />
            <Divider />
            <OtherDetailsInfoBox
              title="Beneficiary Institution"
              value="Zenith Bank"
            /> */}
            <Divider />
            <OtherDetailsInfoBox
              title="Phone"
              value={selected?.wallet?.user?.phone_number || "N/A"}
            />
            <Divider />
            <OtherDetailsInfoBox
              title="Email"
              value={selected?.wallet?.user?.email || "N/A"}
            />
            <Divider />
            <OtherDetailsInfoBox
              title="Account Details"
              value={`${selected?.meta?.withdrawal_details?.account_number}, ${selected?.meta?.withdrawal_details?.bank_name}`}
            />
            <Divider />
            <OtherDetailsInfoBox
              title="Description"
              value={selected?.description}
            />
            <Divider />
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default PreviewPendingPayoutDialog;
