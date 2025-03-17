import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Oriano from "src/assets/tempimages/oraino.png";
import Tecno from "src/assets/tempimages/techno.png";
import Verified from "src/assets/icons/pepicons-pop_checkmark-filled.svg";

import { useTheme } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
import { GLOBAL_COLORS, linkStyle } from "src/utils";

function DistributorsTable() {
  const theme = useTheme();
  const navigate = useNavigate();

  type RenderStatusProps = {
    status: string;
  };
  const RenderStatus = ({ status }: RenderStatusProps) => {
    if (status === "approved" || status === "verified") {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",

            color: GLOBAL_COLORS.GREEN_MAIN,
          }}
        >
          <img
            src={Verified}
            alt="verified"
            style={{ width: "20px", height: "20px" }}
          />
          <Typography variant="subtitle2">Verified</Typography>
        </Box>
      );
    }
    if (status === "unapproved") {
      return (
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Box
            sx={{
              background: theme.palette.error.main,
              width: "7px",
              height: "7px",
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.error.main,
            }}
          >
            Unapproved
          </Typography>
        </Box>
      );
    }
    if (status === "pending") {
      return (
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <Box
            sx={{
              background: theme.palette.warning.main,
              width: "7px",
              height: "7px",
              borderRadius: "50%",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              color: theme.palette.warning.main,
            }}
          >
            Pending
          </Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Typography
          variant="subtitle2"
          sx={{ color: theme.palette.success.main }}
        >
          Resolved
        </Typography>
      </Box>
    );
  };
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <Box>
        {[1, 2, 3, 4, 5, 6, 7].map((row, index) => {
          return (
            <Box
              key={row}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                background: "#ffffff",
                px: 1,
                py: 0.6,
                borderRadius: "8px",

                my: 0.9,
              }}
            >
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Box
                  sx={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    style={linkStyle}
                    to={`${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISTRIBUTOR}/1234`}
                  >
                    <img
                      src={index % 2 === 0 ? Tecno : Oriano}
                      alt="user"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Link>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", gap: 0.6, alignItems: "center" }}>
                    <Link
                      style={linkStyle}
                      to={`${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISTRIBUTOR}/1234`}
                    >
                      <Typography
                        sx={{ fontWeight: 600, cursor: "pointer" }}
                        onClick={() => {
                          navigate(
                            `${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISTRIBUTOR}/1234`
                          );
                        }}
                      >
                        David Stunter
                      </Typography>
                    </Link>
                    <Typography
                      sx={{
                        pl: 0.5,
                        color: theme.palette.info.main,
                        fontSize: "12px",
                      }}
                    >
                      Merchant
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  minWidth: "140px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.3,
                  flexDirection: "column",
                }}
              >
                <RenderStatus
                  status={
                    index >= 3 && index < 5
                      ? "pending"
                      : index < 3
                      ? "verified"
                      : "unapproved"
                  }
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default DistributorsTable;
