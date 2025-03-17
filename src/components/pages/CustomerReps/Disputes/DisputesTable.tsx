import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import User from "src/assets/tempimages/user1.png";

import OrderPreviewDialog from "./OrderPreviewDialog/OrderPreviewDialog";
import { useTheme } from "@mui/material/styles";
import { GrStatusInfo } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
// import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";
dayjs.extend(advancedFormat);
function DisputesTable() {
  const [openPreview, setOpenPreview] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const handleOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreview(false);
  };
  console.log(handleOpenPreview);
  type RenderStatusProps = {
    status: string;
  };
  const RenderStatus = ({ status }: RenderStatusProps) => {
    if (status === "active") {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            background: theme.palette.warning.dark,
            color: "#ffffff",
          }}
        >
          <Typography variant="subtitle2">4</Typography>
        </Box>
      );
    }
    if (status === "pending") {
      return (
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          <GrStatusInfo style={{ color: theme.palette.info.main }} />
          <Typography variant="subtitle2">Pending</Typography>
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
      {openPreview && (
        <OrderPreviewDialog
          open={openPreview}
          handleClose={handleClosePreviewProfile}
        />
      )}

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
                  onClick={() => {
                    navigate(
                      `${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/1234`
                    );
                  }}
                >
                  <img
                    src={User}
                    alt="user"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box>
                  <Box sx={{ display: "flex", gap: 0.6, alignItems: "center" }}>
                    <Typography
                      sx={{ fontWeight: 600, cursor: "pointer" }}
                      onClick={() => {
                        navigate(
                          `${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/1234`
                        );
                      }}
                    >
                      David Stunter
                    </Typography>
                    <Typography
                      sx={{
                        pl: 0.5,
                        color: theme.palette.secondary.main,
                        fontSize: "12px",
                      }}
                    >
                      Buyer
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: "13.1px" }} noWrap>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Sequi voluptate iusto provident corporis quisquam!
                  </Typography>
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
                <Typography sx={{ fontSize: "14px" }}>
                  {dayjs().format("MMM Do YYYY")}
                </Typography>

                <RenderStatus
                  status={
                    index >= 3 && index < 5
                      ? "success"
                      : index < 3
                      ? "active"
                      : "pending"
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

export default DisputesTable;
