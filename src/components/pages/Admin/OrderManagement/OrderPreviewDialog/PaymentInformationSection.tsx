import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
import dayjs from "dayjs";

const optionsObj = {
  DETAILS: "Details",
  PAYMENT: "Payment Info.",
  DELIVERY: "Delivery Info.",
};
const options = [optionsObj.DETAILS, optionsObj.PAYMENT, optionsObj.DELIVERY];

type InfoBoxProps = {
  title: string;
  value: string;
  addBoldness?: boolean;
  addUnderline?: boolean;
  addCurrency?: boolean;
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
      <Typography sx={{ fontSize: "13px" }}>{title}</Typography>
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
const Details = () => {
  return (
    <Box>
      <InfoBox title="Order Number" value={"F164926629462002"} />
      <InfoBox title="Order Date" value={dayjs().format("DD mmm YYYY")} />
      <InfoBox
        title="Sold By"
        value={"Runtown Mart"}
        addBoldness
        addUnderline
      />
      <InfoBox title="Tracking ID" value={"F164926629462002"} />
      <InfoBox title="Delivery Fee" value={"3500"} addCurrency />
    </Box>
  );
};
function PaymentInformationSection() {
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
      <Box>{selectedOption === optionsObj.DETAILS && <Details />}</Box>
    </Box>
  );
}
export default PaymentInformationSection;
