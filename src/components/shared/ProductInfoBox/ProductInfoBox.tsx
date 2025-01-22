import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
          {caption1}
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
export default ProductInfoBox;
