import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import ProductImage from "src/assets/tempimages/machine1.jpg";
import UserImage from "src/assets/images/avatar-male.png";
import { currencyFormater, GLOBAL_COLORS } from "src/utils";
// import ProductInfoBox from "src/components/shared/ProductInfoBox/ProductInfoBox";
import { OrderType } from "src/types/orders";

const sizing = { xs: 12, sm: 4, md: 3 };

type Props = {
  selectedOrder: OrderType;
};

function TopSection({ selectedOrder }: Props) {
  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          my: 1,
        }}
      >
        <Grid container spacing={1}>
          <Grid size={sizing}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                background: "#47B48E17",
                p: "3px",
                borderRadius: "12px",
              }}
            >
              <Box>
                <img
                  src={UserImage}
                  alt="user"
                  style={{
                    width: "72px",
                    height: "72px",
                    objectFit: "contain",
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
                    color: GLOBAL_COLORS.SECONDARY_MAIN,
                  }}
                >
                  {selectedOrder?.buyer?.name}
                </Typography>
                {/* <Typography
                  sx={{
                    color: "GrayText",
                    fontSize: "13px",
                  }}
                >
                  {`ID:34568JUI`}
                </Typography> */}
                <Typography
                  sx={{
                    color: "GrayText",
                    fontSize: "13px",
                  }}
                >
                  Buyer
                </Typography>
              </Box>
            </Box>
          </Grid>
          {/* <Grid size={sizing}>
            <ProductInfoBox
              image={ProductImage}
              title="Oriano Pod"
              caption1={`ID:23456`}
            />
          </Grid> */}
          {/* <Grid size={sizing}>
            <ProductInfoBox
              image={ProductImage}
              title="Oriano Store"
              caption1={`ID:23456`}
              caption2="Merchant"
            />
          </Grid> */}
          <Grid size={sizing}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
                &#8358;{currencyFormater(selectedOrder?.total_price, 2)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
export default TopSection;
