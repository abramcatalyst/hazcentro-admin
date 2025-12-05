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
import SubscriptionPlanDialog from "./SubscriptionPlansDialog";
import PayoutPreferenceDialog from "./PayoutPreferenceDialog";
import { GrDeliver } from "react-icons/gr";
import { MdDirectionsBus, MdOutlineEmail } from "react-icons/md";
import { FaPercentage, FaPhoneSquareAlt, FaWhatsapp } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import SameStateDeliveryFeeDialog from "./SameStateDeliveryFeeDialog";
import DifferentStateDeliveryFeeDialog from "./DifferentStateDeliveryFeeDialog";
import TaxFeeDialog from "./TaxFeeDialog";
import ContactEmailDialog from "./ContactEmailDialog";
import ContactWhatsappDialog from "./ContactWhatsappDialog";
import ContactPhoneDialog from "./ContactPhoneDialog";

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
  icon: string | ReturnType<IconType>;
  iconType?: "image" | "icon";
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
  const [openDeliverySameStateDialog, setOpenDeliverySameStateDialog] =
    useState(false);
  const [openDeliveryOtherStateDialog, setOpenDeliveryOtherStateDialog] =
    useState(false);
  const [openTaxPercentDialog, setOpenTaxPercentDialog] = useState(false);
  const [openEmailContactDialog, setOpenEmailContactDialog] = useState(false);
  const [openWhatsappDialog, setOpenWhatsappDialog] = useState(false);
  const [openPhoneContactDialog, setOpenPhoneContactDialog] = useState(false);

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
  const handleOpenDeliverySameStateDialog = () => {
    setOpenDeliverySameStateDialog(true);
  };
  const handleCloseDeliverySameStateDialog = () => {
    setOpenDeliverySameStateDialog(false);
  };
  const handleOpenDeliveryOtherStateDialog = () => {
    setOpenDeliveryOtherStateDialog(true);
  };
  const handleCloseDeliveryOtherStateDialog = () => {
    setOpenDeliveryOtherStateDialog(false);
  };
  const handleOpenTaxSettingsDialog = () => {
    setOpenTaxPercentDialog(true);
  };
  const handleCloseTaxSettingsDialog = () => {
    setOpenTaxPercentDialog(false);
  };

  const handleOpenContactEmailDialog = () => {
    setOpenEmailContactDialog(true);
  };
  const handleCloseContactEmailDialog = () => {
    setOpenEmailContactDialog(false);
  };
  const handleOpenContactPhoneDialog = () => {
    setOpenPhoneContactDialog(true);
  };
  const handleCloseContactPhoneDialog = () => {
    setOpenPhoneContactDialog(false);
  };
  const handleOpenContactWhatsappDialog = () => {
    setOpenWhatsappDialog(true);
  };
  const handleCloseContactWhatsappDialog = () => {
    setOpenWhatsappDialog(false);
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
          {typeof icon === "string" ? (
            <img
              src={icon}
              style={{
                objectFit: "contain",
                width: "22px",
                height: "22px",
              }}
            />
          ) : (
            <Box>{icon}</Box>
          )}
        </Box>
      </Box>
    );
  };
  console.log(handleOpenCurrencyDialog, handleOpenPreferenceDialog);
  const iconStyles = { fontSize: "16px" };

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
            // data={data || null}
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
        {openDeliverySameStateDialog && data && (
          <SameStateDeliveryFeeDialog
            open={openDeliverySameStateDialog}
            data={data}
            handleClose={handleCloseDeliverySameStateDialog}
          />
        )}

        {openDeliveryOtherStateDialog && data && (
          <DifferentStateDeliveryFeeDialog
            open={openDeliveryOtherStateDialog}
            data={data}
            handleClose={handleCloseDeliveryOtherStateDialog}
          />
        )}
        {openTaxPercentDialog && data && (
          <TaxFeeDialog
            open={openTaxPercentDialog}
            data={data}
            handleClose={handleCloseTaxSettingsDialog}
          />
        )}
        {openEmailContactDialog && data && (
          <ContactEmailDialog
            open={openEmailContactDialog}
            data={data}
            handleClose={handleCloseContactEmailDialog}
          />
        )}

        {openWhatsappDialog && data && (
          <ContactWhatsappDialog
            open={openWhatsappDialog}
            data={data}
            handleClose={handleCloseContactWhatsappDialog}
          />
        )}

        {openPhoneContactDialog && data && (
          <ContactPhoneDialog
            open={openPhoneContactDialog}
            data={data}
            handleClose={handleCloseContactPhoneDialog}
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
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Delivery Fee (Same state)"
                  content="Define order delivery fees for the same state"
                  icon={<GrDeliver style={iconStyles} />}
                  handleClick={handleOpenDeliverySameStateDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Delivery Fee (Different state)"
                  content="Define order delivery fees for different state"
                  icon={<MdDirectionsBus style={iconStyles} />}
                  handleClick={handleOpenDeliveryOtherStateDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Tax Rate Percent (%)"
                  content="Define the tax rate percent"
                  icon={<FaPercentage style={iconStyles} />}
                  handleClick={handleOpenTaxSettingsDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Support Whatsapp Number"
                  content="Manage support Whatsapp phone number"
                  icon={<FaWhatsapp style={iconStyles} />}
                  handleClick={handleOpenContactWhatsappDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Support Phone Numbers"
                  content="Manage support phone numbers"
                  icon={<FaPhoneSquareAlt style={iconStyles} />}
                  handleClick={handleOpenContactPhoneDialog}
                />
              </Grid>
              <Grid size={sizing}>
                <OptionCard
                  iconType="icon"
                  title="Support Emails"
                  content="Manage support email address"
                  icon={<MdOutlineEmail style={iconStyles} />}
                  handleClick={handleOpenContactEmailDialog}
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
