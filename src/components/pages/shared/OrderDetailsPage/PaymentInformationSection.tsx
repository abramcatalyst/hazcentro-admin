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
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        mb: 1,
      }}
    >
      <Typography sx={{ fontSize: "13px", minWidth: "100px" }}>
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "13px",

          fontWeight: addBoldness ? 600 : 400,
          textDecoration: addUnderline ? "underline" : "none",
        }}
      >
        {addCurrency ? <> &#8358;{currencyFormater(value)}</> : value}
      </Typography>
    </Box>
  );
};
const Payment = ({ selectedOrder }: Props) => {
  return (
    <Box>
      <InfoBox title="Order Number" value={selectedOrder?.id} />
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
      <InfoBox title="Tracking ID" value={selectedOrder?.tracking_id} />
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
  const [selectedOption, setSelectedOption] = useState(options[0]);

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
          my: 1,
          background: "#FFFCF6",
          maxWidth: "381px",
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        {options.map((item) => {
          return (
            <Box
              key={item}
              sx={{
                borderRadius: "6px",
                py: 0.5,
                width: { xs: "100%", sm: "105px" },
                height: "33px",
                background: selectedOption === item ? "#FEF7E3" : "#F8F8F9",
                border:
                  selectedOption === item
                    ? `1px solid ${GLOBAL_COLORS.PRIMARY_LIGHT}`
                    : "none",
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedOption(item);
              }}
            >
              <Typography variant="body2">{item}</Typography>
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
