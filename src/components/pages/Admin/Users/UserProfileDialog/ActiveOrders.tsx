import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Machine1 from "src/assets/tempimages/machine1.jpg";
import { GLOBAL_COLORS } from "src/utils";
import { Link } from "react-router-dom";

function ActiveOrders() {
  let testOrders = ["2"];
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
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom>Active Orders</Typography>
        <Link
          to="#"
          style={{ color: GLOBAL_COLORS.GREEN_MAIN, fontSize: "13px" }}
        >
          View All
        </Link>
      </Box>
      <Box
        sx={{
          my: 1,
        }}
      >
        {testOrders.length > 0 ? (
          testOrders.map((order) => (
            <Box
              key={order}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",

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
                    src={Machine1}
                    alt={"Delete Account"}
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
                    {"Oriano Box"}
                  </Typography>
                  <Typography sx={{ fontSize: "13px", color: "GrayText" }}>
                    SKU:{"NB69823x"}
                  </Typography>
                </Box>
              </Box>
              <Button size="large" color="error">
                View details
              </Button>
              {/* <Box
              role="button"
              sx={{
                borderRadius: "6px",
                my: 0.6,
                height: "42px",
                display: "flex",
                gap: 0.9,
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                background: "#EE4F160D",
                "&:hover": {
                  background: theme.palette.common.white,
                },
              }}
            >
            
              <Typography
                sx={{ fontSize: "14px", color: theme.palette.error.main }}
              >
                {"Delete Account"}
              </Typography>
            </Box> */}
            </Box>
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "140px",
              background: "#ffffff",
              p: 1,
              borderRadius: "12px",
              my: 0.6,
            }}
          >
            <Typography sx={{ fontSize: "15px", textAlign: "center" }}>
              No active order
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default ActiveOrders;
