import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchSettings } from "src/services/settings";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { formatErrorMessage, GLOBAL_COLORS } from "src/utils";
import PaymentSuccessImg from "src/assets/images/payment-success-02.png";
import InvoiceImg from "src/assets/images/invoice-01.png";
import MailImg from "src/assets/images/mail-at-sign-02.png";
import CoupounImg from "src/assets/images/coupon-percent.png";
import EmailNotificationDialog from "./EmailNotificationDialog";
import DiscountSettingDialog from "./DiscountSettingDialog";
import CurrencySettingDialog from "./CurrencySettingDialog";
import SubscriptionPlanDialog from "./SubscriptionPlanDialog";
import PayoutPreferenceDialog from "./PayoutPreferenceDialog";

{
  // "key": "admin_email_for_alerts",
  // "value": [
  //     "admin@example.com",
  //     "another.admin@example.com"
  // ]
  // "key" : "payout_preference",
  // "value": "weekly (saturdays)"
  // "key" : "enable_push_notifications",
  // "value": true,
  // "type": "boolean"
  // "key": "enable_faqs",
  // "value": true,
  // "type": "boolean"
}
type OptionCardProps = {
  title: string;
  content: string;
  icon: string;
  handleClick: () => void;
};
const sizing = { xs: 12, sm: 6, md: 4 };
const SettingsWrapper = () => {
  const [openEmailNotificationDialog, setOpenEmailNotificationDialog] =
    useState(false);
  const [openCurrencySetting, setOpenCurrencySetting] = useState(false);
  const [openDiscountSetting, setOpenDiscountSetting] = useState(false);
  const [openSubscriptionSetting, setOpenSubscriptionSetting] = useState(false);
  const [openPreferenceDialog, setOpenPreferenceDialog] = useState(false);

  const { isError, error, isLoading, data } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SETTINGS, {}],
    queryFn: () => fetchSettings(),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isLoading) {
    return <HalfScreenLoader />;
  }

  const handleOpenEmailDialog = () => {
    setOpenEmailNotificationDialog(true);
  };
  const handleCloseEmailDialog = () => {
    setOpenEmailNotificationDialog(false);
  };

  const handleOpenSubscriptionDialog = () => {
    setOpenSubscriptionSetting(true);
  };
  const handleCloseSubscriptionDialog = () => {
    setOpenSubscriptionSetting(false);
  };
  const handleOpenDiscountDialog = () => {
    setOpenDiscountSetting(true);
  };
  const handleCloseDiscountDialog = () => {
    setOpenDiscountSetting(false);
  };
  const handleOpenCurrencyDialog = () => {
    setOpenCurrencySetting(true);
  };
  const handleCloseCurrencyDialog = () => {
    setOpenCurrencySetting(false);
  };

  const handleOpenPreferenceDialog = () => {
    setOpenPreferenceDialog(true);
  };
  const handleClosePreferenceDialog = () => {
    setOpenPreferenceDialog(false);
  };

  const OptionCard = ({
    title,
    content,
    icon,
    handleClick,
  }: OptionCardProps) => {
    return (
      <Box
        sx={{
          background: GLOBAL_COLORS.GREY_50,
          borderRadius: "12px",
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 1,
          minHeight: "100px",
          cursor: "pointer",
        }}
        onClick={() => {
          handleClick();
        }}
      >
        <Box sx={{ maxWidth: "260px" }}>
          <Typography sx={{ fontWeight: 500 }}>{title}</Typography>
          <Typography sx={{ fontSize: "12.5px" }}>{content}</Typography>
        </Box>
        <Box>
          <img
            src={icon}
            style={{
              objectFit: "contain",
              width: "22px",
              height: "22px",
            }}
          />
        </Box>
      </Box>
    );
  };
  console.log(handleOpenCurrencyDialog, handleOpenPreferenceDialog);
  return (
    <Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            flexWrap: "wrap",
            mb: 2,
          }}
        >
          <AppHeader text="Settings" />
        </Box>
        {openEmailNotificationDialog && (
          <EmailNotificationDialog
            open={openEmailNotificationDialog}
            data={data || null}
            handleClose={handleCloseEmailDialog}
          />
        )}
        {openDiscountSetting && (
          <DiscountSettingDialog
            open={openDiscountSetting}
            handleClose={handleCloseDiscountDialog}
          />
        )}
        {openPreferenceDialog && (
          <PayoutPreferenceDialog
            open={openPreferenceDialog}
            data={data || null}
            handleClose={handleClosePreferenceDialog}
          />
        )}
        {openSubscriptionSetting && (
          <SubscriptionPlanDialog
            open={openSubscriptionSetting}
            data={data || null}
            handleClose={handleCloseSubscriptionDialog}
          />
        )}
        {openCurrencySetting && (
          <CurrencySettingDialog
            open={openCurrencySetting}
            data={data || null}
            handleClose={handleCloseCurrencyDialog}
          />
        )}

        <Box
          sx={{ my: 2, px: { xs: 0.5, sm: 1 }, py: 2, background: "#ffffff" }}
        >
          <Box>
            <Grid container spacing={1}>
              <Grid size={sizing}>
                <OptionCard
                  title="Payout Preference"
                  content="Configure payout frequencies and payment methods."
                  icon={InvoiceImg}
                  handleClick={handleOpenPreferenceDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  title="Subscription Plans"
                  content="Manage subscription tiers, pricing, and renewal options."
                  icon={PaymentSuccessImg}
                  handleClick={handleOpenSubscriptionDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  title="Discount & Coupon Management"
                  content="Define settings for discount codes, coupons, and promotional pricing."
                  icon={CoupounImg}
                  handleClick={handleOpenDiscountDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  title="Email Notifications"
                  content="Configure automated email notifications for orders, payments, and user activities."
                  icon={MailImg}
                  handleClick={handleOpenEmailDialog}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </ErrorBoundary>
    </Box>
  );
};

export default SettingsWrapper;
