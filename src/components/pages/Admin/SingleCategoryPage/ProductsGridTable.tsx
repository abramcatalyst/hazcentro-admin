import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

import dayjs from "dayjs";
import { currencyFormater, GLOBAL_COLORS, tableMenuStyles } from "src/utils";
import ProductDetailsDialog from "./ProductDetailsDialog";
import ProductImg from "src/assets/tempimages/img1.png";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import { useTheme } from "@mui/material/styles";

dayjs.extend(advancedFormat);

const sizing = { xs: 6, sm: 4, md: 3, lg: 2 };

function ProductsGridTable() {
  const [openPreviewProfile, setOpenPreviewProfile] = useState(false);
  const theme = useTheme();
  const handleOpenPreviewProfile = () => {
    setOpenPreviewProfile(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreviewProfile(false);
  };
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreviewProfile && (
        <ProductDetailsDialog
          open={openPreviewProfile}
          handleClose={handleClosePreviewProfile}
        />
      )}

      <Box>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => {
            return (
              <Grid size={sizing} key={`${row}`}>
                <Box
                  sx={{
                    background: "#ffffff",
                    p: 1,
                    borderRadius: "12px",
                  }}
                >
                  <Box
                    sx={{
                      // width: "159px",
                      height: "159px",
                      position: "relative",
                      borderRadius: "6px",
                    }}
                    // onClick={() => {
                    //   handleOpenPreviewProfile();
                    // }}
                  >
                    <Box
                      sx={{
                        borderRadius: "6px",
                        position: "absolute",
                        p: 0.3,
                        top: 0,
                        right: 0.5,
                        background: GLOBAL_COLORS.GREY_50,
                      }}
                    >
                      <Typography sx={{ fontSize: "12px" }}>
                        &#8358;{currencyFormater(300000)}
                      </Typography>
                    </Box>
                    <img
                      src={ProductImg}
                      alt="product"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      mt: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontSize: "13px", fontWeight: 500 }}>
                        Product Name
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
                        Created : {dayjs().format("MM Do YYYY")}
                      </Typography>
                    </Box>

                    <PopupState variant="popover">
                      {(popupState) => (
                        <Fragment>
                          <IconButton {...bindTrigger(popupState)}>
                            <MoreVertRoundedIcon />
                          </IconButton>
                          <Menu {...bindMenu(popupState)}>
                            <MenuItem
                              onClick={() => {
                                handleOpenPreviewProfile();
                                popupState.close();
                              }}
                              sx={tableMenuStyles}
                            >
                              View Product
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                // handleOpenTransactionPreview(row);
                                popupState.close();
                              }}
                              sx={{
                                ...tableMenuStyles,
                                color: theme.palette.error.main,
                              }}
                            >
                              Delete
                            </MenuItem>
                          </Menu>
                        </Fragment>
                      )}
                    </PopupState>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default ProductsGridTable;
