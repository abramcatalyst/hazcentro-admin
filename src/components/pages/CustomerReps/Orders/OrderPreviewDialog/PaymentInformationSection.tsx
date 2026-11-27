import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import dayjs from "dayjs";
import { OrderType } from "src/types/orders";

const optionsObj = {
  DETAILS: "Details",
  PAYMENT: "Payment Info.",
  DELIVERY: "Delivery Info.",
};
const options = [optionsObj.PAYMENT, optionsObj.DELIVERY];

type InfoBoxProps = {
  title: string;
  value: string;
  addBoldness?: boolean;
  addUnderline?: boolean;
  addCurrency?: boolean;
};
type Props = {
  selectedOrder: OrderType;
};
const InfoBox = ({
  title,
  value,
  addBoldness,
  addUnderline,
  addCurrency,
}: InfoBoxProps) => {
  const displayValue = value?.toString().trim() || "N/A";

  return (
    <Typography
      sx={{
        fontSize: "13px",
        mb: 1,
        lineHeight: 1.5,
      }}
    >
      <Box component="span" sx={{ color: "text.secondary" }}>
        {title}:
      </Box>{" "}
      <Box
        component="span"
        sx={{
          fontWeight: addBoldness ? 600 : 400,
          textDecoration: addUnderline ? "underline" : "none",
        }}
      >
        {addCurrency ? (
          <>
            &#8358;{currencyFormater(displayValue)}
          </>
        ) : (
          displayValue
        )}
      </Box>
    </Typography>
  );
};
const Payment = ({ selectedOrder }: Props) => {
  return (
    <Box>
      <InfoBox title="Tracking ID" value={selectedOrder?.tracking_id} addBoldness />
      <InfoBox
        title="Order Date"
        value={dayjs(selectedOrder?.created_at).format("HH:MMa, DD MMM YYYY")}
      />
      <InfoBox
        title="Payment Ref."
        value={selectedOrder?.payment_reference}
        addBoldness
      />
      <InfoBox
        title="Payment Status"
        value={selectedOrder?.payment_status}
        addBoldness
      />
    </Box>
  );
};
const Delivery = ({ selectedOrder }: Props) => {
  return (
    <Box>
      <InfoBox title="Address" value={selectedOrder?.order_delivery?.address} />
      <InfoBox title="City" value={selectedOrder?.order_delivery?.city} />
      <InfoBox title="State" value={selectedOrder?.order_delivery?.state} />
      <InfoBox title="Country" value={selectedOrder?.order_delivery?.country} />
      <InfoBox
        title="Zip Code"
        value={selectedOrder?.order_delivery?.zip_code}
      />
      <InfoBox
        title="Latitude"
        value={selectedOrder?.order_delivery?.latitude}
      />
      <InfoBox
        title="Longitude"
        value={selectedOrder?.order_delivery?.longitude}
      />
      <InfoBox
        title="Phone Number"
        value={selectedOrder?.order_delivery?.phone_number}
      />
    </Box>
  );
};

function PaymentInformationSection({ selectedOrder }: Props) {
  const [selectedOption, setSelectedOption] = useState<string>(
    optionsObj.DELIVERY
  );

  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          mb: 1,
          p: 0.5,
          background: "#FFFCF6",
          borderRadius: "8px",
          display: "flex",
          width: "100%",
          gap: 0.5,
        }}
      >
        {options.map((item) => {
          const isActive = selectedOption === item;

          return (
            <Box
              key={item}
              sx={{
                flex: 1,
                borderRadius: "6px",
                py: 0.75,
                px: 1,
                minHeight: 36,
                background: isActive ? "#FEF7E3" : "#F8F8F9",
                border: isActive
                  ? `1px solid ${GLOBAL_COLORS.PRIMARY_LIGHT}`
                  : "1px solid transparent",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedOption(item);
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  whiteSpace: "nowrap",
                }}
              >
                {item}
              </Typography>
            </Box>
          );
        })}
      </Box>
      <Box>
        {selectedOption === optionsObj.PAYMENT && (
          <Payment selectedOrder={selectedOrder} />
        )}
        {selectedOption === optionsObj.DELIVERY && (
          <Delivery selectedOrder={selectedOrder} />
        )}
      </Box>
    </Box>
  );
}
export default PaymentInformationSection;
