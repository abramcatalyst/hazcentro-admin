import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PlaceholderImage from "src/assets/images/placeholder.png";
import { alpha, useTheme } from "@mui/material/styles";
import { PartOrderType } from "src/types/vendor";

type Props = {
  data: PartOrderType;
};
function VendorOrderItemCard({ data }: Props) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        border: `1px solid ${theme.palette.grey[200]}`,
        background: "#ffffff",
        p: { xs: 1 },
        borderRadius: "12px",
        my: 0.6,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            borderRadius: "6px",
            height: "72px",
            width: "72px",
          }}
        >
          <img
            src={data?.items[0]?.image ?? PlaceholderImage}
            alt={"Item"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </Box>
        <Box>
          <Typography sx={{ fontSize: "15px" }}>
            {data?.items[0]?.product_name}
          </Typography>
          <Typography sx={{ fontSize: "13px", color: "GrayText" }}>
            SKU:{data?.items[0]?.sku}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        color="error"
        sx={{
          minWidth: "93px",
          fontSize: "12.4px",
          background: alpha(theme.palette.error.light, 0.05),
          color: "#000000",
          "&:hover": {
            background: alpha(theme.palette.error.light, 0.7),
            color: "#ffffff",
          },
        }}
      >
        View details
      </Button>
    </Box>
  );
}
export default VendorOrderItemCard;
