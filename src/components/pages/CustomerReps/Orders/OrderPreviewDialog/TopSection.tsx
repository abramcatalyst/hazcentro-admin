import Grid from "@mui/material/Grid2";

import Box from "@mui/material/Box";

import Chip from "@mui/material/Chip";

import Typography from "@mui/material/Typography";

import UserImage from "src/assets/images/avatar-male.png";

import { alpha } from "@mui/material/styles";

import { currencyFormater, GLOBAL_COLORS } from "src/utils";

import { OrderType } from "src/types/orders";

import renderStatus from "src/components/shared/RenderStatus/renderStatus";



const sizing = { xs: 12, sm: 6, md: 4 };



type Props = {

  selectedOrder: OrderType;

};



function TopSection({ selectedOrder }: Props) {

  return (

    <Box

      sx={{

        my: 1,

        background: GLOBAL_COLORS.GREY_50,

        p: { xs: 1, sm: 1.25 },

        borderRadius: "20px",

      }}

    >

      <Grid container spacing={1.25}>

        <Grid size={sizing}>

          <Box

            sx={{

              display: "flex",

              gap: 1.25,

              alignItems: "center",

              background: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.09),

              p: 1.25,

              borderRadius: "16px",

              border: `1px solid ${alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.14)}`,

              minHeight: 96,

            }}

          >

            <Box

              component="img"

              src={UserImage}

              alt="buyer"

              sx={{

                width: 56,

                height: 56,

                objectFit: "cover",

                borderRadius: "12px",

              }}

            />

            <Box>

              <Chip

                label="Buyer"

                size="small"

                sx={{

                  height: 20,

                  mb: 0.5,

                  fontSize: "0.68rem",

                  bgcolor: alpha(GLOBAL_COLORS.SECONDARY_MAIN, 0.12),

                  color: GLOBAL_COLORS.SECONDARY_DARK,

                }}

              />

              <Typography

                sx={{

                  fontWeight: 600,

                  fontSize: "0.95rem",

                  color: GLOBAL_COLORS.SECONDARY_DARK,

                }}

              >

                {selectedOrder?.buyer?.name}

              </Typography>

            </Box>

          </Box>

        </Grid>



        <Grid size={sizing}>

          <Box

            sx={{

              p: 1.25,

              borderRadius: "16px",

              minHeight: 96,

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

            }}

          >

            <Typography

              sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 0.75 }}

            >

              Payment status

            </Typography>

            {renderStatus(selectedOrder?.payment_status)}

          </Box>

        </Grid>



        <Grid size={sizing}>

          <Box

            sx={{

              width: "100%",

              minHeight: 96,

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              px: 0.5,

            }}

          >

            <Typography

              sx={{ color: "text.secondary", fontSize: "0.78rem", mb: 0.25 }}

            >

              Order total

            </Typography>

            <Typography

              sx={{ fontSize: "1.35rem", fontWeight: 700, color: "text.primary" }}

            >

              &#8358;{currencyFormater(selectedOrder?.total_price, 2)}

            </Typography>

          </Box>

        </Grid>

      </Grid>

    </Box>

  );

}



export default TopSection;

