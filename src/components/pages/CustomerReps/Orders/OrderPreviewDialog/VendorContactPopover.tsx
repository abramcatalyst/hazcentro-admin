import { MouseEvent, useState } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import { alpha } from "@mui/material/styles";
import { GLOBAL_COLORS } from "src/utils";
import { OrderItemType } from "src/types/orders";

type VendorInfo = OrderItemType["product"]["vendor"];

type Props = {
  vendor: VendorInfo | undefined;
};

/**
 * Resolve the display name for a vendor on an order line item.
 */
function getVendorDisplayName(vendor: VendorInfo | undefined): string {
  return vendor?.business_name || vendor?.name || "Unknown vendor";
}

/**
 * Resolve the best phone number for contacting a vendor.
 */
function getVendorPhone(vendor: VendorInfo | undefined): string | null {
  const phone =
    vendor?.business_phone_number || vendor?.user?.phone_number || null;

  return phone?.trim() ? phone.trim() : null;
}

/**
 * Resolve the best email for contacting a vendor.
 */
function getVendorEmail(vendor: VendorInfo | undefined): string | null {
  const email = vendor?.user?.email || null;

  return email?.trim() ? email.trim() : null;
}

/**
 * Resolve the best address for a vendor.
 */
function getVendorAddress(vendor: VendorInfo | undefined): string | null {
  const address =
    vendor?.warehouse_location || vendor?.user?.address || null;

  return address?.trim() ? address.trim() : null;
}

/**
 * Clickable vendor name that opens contact details for agents.
 */
function VendorContactPopover({ vendor }: Props) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const displayName = getVendorDisplayName(vendor);
  const phone = getVendorPhone(vendor);
  const email = getVendorEmail(vendor);
  const address = getVendorAddress(vendor);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!vendor) {
    return (
      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
        N/A
      </Typography>
    );
  }

  return (
    <>
      <Link
        component="button"
        type="button"
        underline="hover"
        onClick={handleOpen}
        sx={{
          fontSize: "13px",
          fontWeight: 600,
          color: GLOBAL_COLORS.PRIMARY_MAIN,
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        {displayName}
      </Link>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              mt: 0.5,
              p: 1.5,
              minWidth: 240,
              maxWidth: 320,
              borderRadius: "12px",
              border: `1px solid ${alpha(GLOBAL_COLORS.PRIMARY_MAIN, 0.12)}`,
            },
          },
        }}
      >
        <Stack spacing={1.25}>
          <Box>
            <Typography
              sx={{
                fontSize: "0.68rem",
                fontWeight: 600,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                mb: 0.35,
              }}
            >
              Vendor contact
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "0.92rem" }}>
              {displayName}
            </Typography>
          </Box>

          {phone ? (
            <Stack direction="row" spacing={0.75} alignItems="flex-start">
              <PhoneRoundedIcon
                sx={{ fontSize: "1rem", color: "text.secondary", mt: 0.15 }}
              />
              <Link
                href={`tel:${phone.replace(/\s/g, "")}`}
                underline="hover"
                sx={{ fontSize: "0.84rem", fontWeight: 500 }}
              >
                {phone}
              </Link>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
              No phone number on file
            </Typography>
          )}

          {email ? (
            <Stack direction="row" spacing={0.75} alignItems="flex-start">
              <EmailRoundedIcon
                sx={{ fontSize: "1rem", color: "text.secondary", mt: 0.15 }}
              />
              <Link
                href={`mailto:${email}`}
                underline="hover"
                sx={{ fontSize: "0.84rem", fontWeight: 500, wordBreak: "break-all" }}
              >
                {email}
              </Link>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
              No email on file
            </Typography>
          )}

          {address ? (
            <Stack direction="row" spacing={0.75} alignItems="flex-start">
              <LocationOnRoundedIcon
                sx={{ fontSize: "1rem", color: "text.secondary", mt: 0.15 }}
              />
              <Typography sx={{ fontSize: "0.82rem", lineHeight: 1.4 }}>
                {address}
              </Typography>
            </Stack>
          ) : (
            <Typography sx={{ fontSize: "0.82rem", color: "text.secondary" }}>
              No address on file
            </Typography>
          )}
        </Stack>
      </Popover>
    </>
  );
}

export default VendorContactPopover;
