import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { currencyFormater } from "src/utils";
import Machine from "src/assets/tempimages/machine1.jpg";

const TrendingProductCard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        gap: 1,
        alignItems: "center",
        justifyContent: "space-between",
        mb: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 0.8,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "70px",
            height: "79px",
          }}
        >
          <img
            src={Machine}
            alt="total sales"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "6px",
            }}
          />
        </Box>
        <Box>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              color: "#312F27B2",
              fontSize: { xs: "14px", sm: "17px" },
            }}
          >
            Ex Escavator
          </Typography>
          <Typography fontSize="14px" color="#312F27B2">
            SKU:6123HJD
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: { xs: "14px", sm: "17px" },
            color: "#312F27B2",
          }}
        >
          &#8358;{currencyFormater(4320090)}
        </Typography>
      </Box>
    </Box>
  );
};
const TrendingProducts = () => {
  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        p: { xs: 0.5, sm: 1 },
        borderRadius: "12px",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 1 }}>
        Trending Products
      </Typography>
      <TrendingProductCard />
      <TrendingProductCard />
      <TrendingProductCard />
      <TrendingProductCard />
    </Box>
  );
};

export default TrendingProducts;
