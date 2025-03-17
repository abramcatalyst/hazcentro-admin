import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MachineImg from "src/assets/tempimages/machine1.jpg";
import { currencyFormater } from "src/utils";

type ProductInfoBoxProps = {
  image: string;
  title: string;
  caption1: string;
  caption2?: string;
  direction?: "row" | "column";
};
const ProductInfoBox = ({
  image,
  title,
  caption1,
  caption2,
  direction = "row",
}: ProductInfoBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        gap: direction === "column" ? "2px" : 1,
        alignItems: direction === "column" ? "flex-start" : "center",
      }}
    >
      <Box>
        <img
          src={image}
          alt="product"
          style={{
            width: direction === "column" ? "46px" : "72px",
            height: direction === "column" ? "46px" : "72px",
            objectFit: "cover",
            borderRadius: "6px",
            marginTop: "2px",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          &#8358;{currencyFormater(caption1)}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          {caption2}
        </Typography>
      </Box>
    </Box>
  );
};
const ActiveOrders = () => {
  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "20px" }}
      elevation={0}
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
        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
          Active Orders
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ProductInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`20000`}
        />
        <Button size="small" color="success" sx={{ color: "#47B48E" }}>
          View details
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ProductInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`20000`}
        />
        <Button size="small" color="success" sx={{ color: "#47B48E" }}>
          View details
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ProductInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`260000`}
        />
        <Button size="small" color="success" sx={{ color: "#47B48E" }}>
          View details
        </Button>
      </Box>
    </Box>
  );
};

export default ActiveOrders;
