import { Fragment } from "react";
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
import ProductImg from "src/assets/images/logo.png";

import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import { useTheme } from "@mui/material/styles";
import { ProductTableProps } from "./SingleCategoryWrapper";

dayjs.extend(advancedFormat);

const sizing = { xs: 6, sm: 4, md: 3, lg: 2 };

function ProductsGridTable({ data, handleOpenPreview }: ProductTableProps) {
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", my: 1 }}>
      <Box>
        <Grid container spacing={2}>
          {data?.products?.data?.map((row) => {
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
                        &#8358;{currencyFormater(row?.price, 2)}
                      </Typography>
                    </Box>
                    <img
                      src={row?.media[0]?.original_url || ProductImg}
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
                        {row?.name}
                      </Typography>
                      <Typography sx={{ fontSize: "12px", color: "GrayText" }}>
                        Created : {dayjs(row?.created_at).format("MM Do YYYY")}
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
                                handleOpenPreview(row);
                                popupState.close();
                              }}
                              sx={tableMenuStyles}
                            >
                              View Product
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
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
