import { useState } from "react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import Toolbar from "@mui/material/Toolbar";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormControl from "@mui/material/FormControl";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import { FilterSelectOptionsTypes } from "src/types/filters";
// import { FILTER_DATE_FORMAT } from "src/utils";

const sizing = { xs: 12, sm: 6 };
type Props = {
  search?: string;
  searchId?: string;
  status?: string;
  category?: string;
  transactionType?: string;
  searchLabel?: string;
  minAmountLabel?: string;
  maxAmountLabel?: string;
  startDateLabel?: string;
  endDateLabel?: string;
  searchIdLabel?: string;
  userName?: string;
  minAmount?: string | number;
  maxAmount?: string | number;
  minWonAmount?: string | number;
  maxWonAmount?: string | number;
  minOdd?: string | number;
  maxOdd?: string | number;
  minPotentialWin?: string | number;
  maxPotentialWin?: string | number;
  statusData?: FilterSelectOptionsTypes[];
  categoryData?: FilterSelectOptionsTypes[];
  transactionTypeData?: FilterSelectOptionsTypes[];
  endDate?: string | null;
  startDate?: string | null;
  lastLoginDate?: string | null;
  handleChangeSearch?: (value: string) => void;
  handleChangeSearchId?: (value: string) => void;
  handleChangeStatus?: (value: string) => void;
  handleChangeStartDate?: (value: string) => void;
  handleChangeEndDate?: (value: string) => void;
  handleChangeLastLoginDate?: (value: string) => void;
  handleChangeMinAmount?: (value: string) => void;
  handleChangeMaxAmount?: (value: string) => void;
  handleChangeMinWonAmount?: (value: string) => void;
  handleChangeMaxWonAmount?: (value: string) => void;
  handleChangeMinOdd?: (value: string) => void;
  handleChangeMaxOdd?: (value: string) => void;
  handleChangeMinPotentialWin?: (value: string) => void;
  handleChangeMaxPotentialWin?: (value: string) => void;
  handleChangeCategory?: (value: string) => void;
  handleChangeTransactionType?: (value: string) => void;
  handleChangeUserName?: (value: string) => void;
  handleClearFilters?: () => void;
  handleDeleteStartDate?: () => void;
  handleDeleteEndDate?: () => void;
  handleDeleteSearch?: () => void;
  handleDeleteSearchId?: () => void;
  handleDeleteStatus?: () => void;
  handleDeleteMinAmount?: () => void;
  handleDeleteMaxAmount?: () => void;
  handleDeleteMinWonAmount?: () => void;
  handleDeleteMaxWonAmount?: () => void;
  handleDeleteMinOdd?: () => void;
  handleDeleteMaxOdd?: () => void;
  handleDeleteMinPotentialWin?: () => void;
  handleDeleteMaxPotentialWin?: () => void;
  handleDeleteUserName?: () => void;
  handleDeleteLastLoginDate?: () => void;
  handleDeleteCategory?: () => void;
  handleDeleteTransactionType?: () => void;
  handleDownloadCSV?: () => void;
  showDownloadButton: boolean;
  categoryLabel?: string;
  hideFilter?: boolean;
};
const CustomTableFilter = ({
  showDownloadButton,
  hideFilter = false,
  startDateLabel,
  endDateLabel,
  search,
  searchId,
  status,
  startDate,
  endDate,
  searchLabel,
  minAmount,
  maxAmount,
  minAmountLabel,
  maxAmountLabel,
  searchIdLabel,
  transactionType,
  lastLoginDate,
  minWonAmount,
  maxWonAmount,
  userName,
  category,
  statusData,
  categoryData,
  transactionTypeData,
  maxOdd,
  maxPotentialWin,
  minOdd,
  minPotentialWin,
  categoryLabel = "Category",
  handleChangeSearchId,
  handleChangeSearch,
  handleClearFilters,
  handleChangeEndDate,
  handleChangeStartDate,
  handleChangeStatus,
  handleChangeMinAmount,
  handleChangeMaxAmount,
  handleChangeUserName,
  handleChangeMinWonAmount,
  handleChangeMaxWonAmount,
  handleChangeTransactionType,
  handleChangeLastLoginDate,
  handleDeleteEndDate,
  handleDeleteStartDate,
  handleDeleteSearch,
  handleChangeCategory,
  handleDeleteMinAmount,
  handleDeleteMaxAmount,
  handleDeleteStatus,
  handleDeleteLastLoginDate,
  handleDeleteTransactionType,
  handleDeleteUserName,
  handleDeleteMaxWonAmount,
  handleDeleteMinWonAmount,
  handleDeleteCategory,
  handleDeleteSearchId,
  handleChangeMaxOdd,
  handleChangeMaxPotentialWin,
  handleChangeMinOdd,
  handleChangeMinPotentialWin,
  handleDeleteMaxOdd,
  handleDeleteMaxPotentialWin,
  handleDeleteMinOdd,
  handleDeleteMinPotentialWin,
  handleDownloadCSV,
}: Props) => {
  const [anchorElFilter, setAnchorElFilter] = useState<null | HTMLElement>(
    null,
  );

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setAnchorElFilter(null);
  };
  const newMinAmountLabel = minAmountLabel || "Min amount";
  const newMaxAmountLabel = maxAmountLabel || "Max amount";
  const newSearchLabel = searchLabel || "Search";
  const newSearchIdLabel = searchIdLabel || "User ID";
  const newStartDateLabel = startDateLabel || "Start Date";
  const newEndDateLabel = endDateLabel || "End Date";

  return (
    <Toolbar
      disableGutters
      sx={{
        // display: "none",
        p: { sm: 0.3, md: 1 },
      }}
    >
      <Box
        sx={{
          mr: "auto",
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <FormControl
          color="info"
          size="small"
          sx={{
            width: { xs: 200, sm: "270px" },
            display: handleChangeSearch ? "block" : "none",
          }}
        >
          <OutlinedInput
            placeholder={newSearchLabel}
            fullWidth
            value={search}
            onChange={(e) => {
              if (handleChangeSearch) {
                handleChangeSearch(e.target.value);
              }
            }}
            endAdornment={<SearchOutlinedIcon />}
          />
        </FormControl>
        {handleChangeSearchId ? (
          <FormControl
            color="info"
            size="small"
            sx={{ width: { xs: 200, sm: "220px" } }}
          >
            <OutlinedInput
              placeholder={newSearchIdLabel}
              fullWidth
              value={searchId}
              onChange={(e) => handleChangeSearchId(e.target.value)}
              endAdornment={<SearchOutlinedIcon />}
            />
          </FormControl>
        ) : null}
      </Box>
      <Box
        sx={{
          my: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        {hideFilter ? null : (
          <Tooltip title="Open Menu">
            <IconButton onClick={handleOpenFilterMenu}>
              <FilterAltOutlinedIcon />
            </IconButton>
          </Tooltip>
        )}
        <Menu
          sx={{ mt: "35px" }}
          anchorEl={anchorElFilter}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElFilter)}
          onClose={handleCloseFilterMenu}
        >
          <Box p={{ xs: 0.6, sm: 1, width: "100%", maxWidth: "400px" }}>
            <Grid container spacing={1}>
              {handleChangeSearchId && (
                <Grid size={{ xs: 12, sm: 12 }}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{newSearchIdLabel}</InputLabel>
                    <OutlinedInput
                      label={newSearchIdLabel}
                      fullWidth
                      value={searchId}
                      onChange={(e) => handleChangeSearchId(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}
              {userName !== undefined && handleChangeUserName && (
                <Grid size={{ xs: 12, sm: 12 }} sx={{ display: "none" }}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>User Name</InputLabel>
                    <OutlinedInput
                      label="User Name"
                      fullWidth
                      value={userName}
                      onChange={(e) => handleChangeUserName(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}
              {minAmount !== undefined && handleChangeMinAmount && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{newMinAmountLabel}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={newMinAmountLabel}
                      fullWidth
                      value={minAmount}
                      onChange={(e) => handleChangeMinAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}
              {maxAmount !== undefined && handleChangeMaxAmount && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{newMaxAmountLabel}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={newMaxAmountLabel}
                      fullWidth
                      value={maxAmount}
                      onChange={(e) => handleChangeMaxAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}

              {minWonAmount !== undefined && handleChangeMinWonAmount && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Min. won amount"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Min. won amount"}
                      fullWidth
                      value={minWonAmount}
                      onChange={(e) => handleChangeMinWonAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}
              {maxWonAmount !== undefined && handleChangeMaxWonAmount && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Max. won amount"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Max. won amount"}
                      fullWidth
                      value={maxWonAmount}
                      onChange={(e) => handleChangeMaxWonAmount(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}

              {minOdd !== undefined && handleChangeMinOdd && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Min. odd"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Min. odd"}
                      fullWidth
                      value={minOdd}
                      onChange={(e) => handleChangeMinOdd(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}

              {maxOdd !== undefined && handleChangeMaxOdd && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Max. odd"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Max. odd"}
                      fullWidth
                      value={maxOdd}
                      onChange={(e) => handleChangeMaxOdd(e.target.value)}
                    />
                  </FormControl>
                </Grid>
              )}

              {minPotentialWin !== undefined && handleChangeMinPotentialWin && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Min. pot. amount"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Mix. pot. amount"}
                      fullWidth
                      value={minPotentialWin}
                      onChange={(e) =>
                        handleChangeMinPotentialWin(e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              )}

              {maxPotentialWin !== undefined && handleChangeMaxPotentialWin && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>{"Max. pot. amount"}</InputLabel>
                    <OutlinedInput
                      type="number"
                      inputMode="numeric"
                      label={"Max. pot. amount"}
                      fullWidth
                      value={maxPotentialWin}
                      onChange={(e) =>
                        handleChangeMaxPotentialWin(e.target.value)
                      }
                    />
                  </FormControl>
                </Grid>
              )}

              {status !== undefined && statusData && handleChangeStatus && (
                <Grid size={sizing}>
                  <FormControl fullWidth size="small" color="info">
                    <InputLabel>Select Status</InputLabel>
                    <Select
                      label="Select Status"
                      value={status}
                      onChange={(e) => handleChangeStatus(e?.target?.value)}
                    >
                      {statusData?.map((item) => (
                        <MenuItem key={item?.value} value={item.value}>
                          {item?.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {transactionType !== undefined &&
                transactionTypeData &&
                handleChangeTransactionType && (
                  <Grid size={sizing}>
                    <FormControl fullWidth size="small" color="info">
                      <InputLabel>Select Type</InputLabel>
                      <Select
                        label="Select Type"
                        value={transactionType}
                        onChange={(e) =>
                          handleChangeTransactionType(e?.target?.value)
                        }
                      >
                        {transactionTypeData?.map((item) => (
                          <MenuItem key={item?.value} value={item.value}>
                            {item?.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              {category !== undefined &&
                categoryData &&
                handleChangeCategory && (
                  <Grid size={sizing}>
                    <FormControl fullWidth size="small" color="info">
                      <InputLabel>{categoryLabel}</InputLabel>
                      <Select
                        label={categoryLabel}
                        value={category}
                        onChange={(e) => handleChangeCategory(e?.target?.value)}
                      >
                        {categoryData?.map((item) => (
                          <MenuItem key={item?.value} value={item.value}>
                            {item?.title}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              {handleChangeStartDate && (
                <Grid size={sizing}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={newStartDateLabel}
                        disableFuture
                        value={startDate ? dayjs(startDate) : null}
                        name="startDate"
                        onChange={(value) => {
                          if (value) {
                            handleChangeStartDate(value.toString());
                          }
                        }}
                        slotProps={{
                          textField: { size: "small", color: "info" },
                        }}
                        slots={{ clearIcon: ClearRoundedIcon }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              )}
              {handleChangeEndDate && (
                <Grid size={sizing}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label={newEndDateLabel}
                        disableFuture
                        value={endDate ? dayjs(endDate) : null}
                        name="endDate"
                        onChange={(value) => {
                          if (value) {
                            handleChangeEndDate(value.toString());
                          }
                        }}
                        slotProps={{
                          textField: { size: "small", color: "info" },
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              )}
              {handleChangeLastLoginDate && (
                <Grid size={sizing}>
                  <FormControl fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name="lastLoginDate"
                        label={"Last Login Date"}
                        disableFuture
                        value={lastLoginDate ? dayjs(lastLoginDate) : null}
                        onChange={(value) => {
                          if (value) {
                            handleChangeLastLoginDate(value.toString());
                          }
                        }}
                        slotProps={{
                          textField: { size: "small", color: "info" },
                        }}
                        slots={{ clearIcon: ClearRoundedIcon }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              )}
            </Grid>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "space-between",
                mt: 2,
              }}
            >
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="error"
                onClick={() => {
                  if (handleClearFilters) {
                    handleClearFilters();
                  }
                }}
              >
                Clear Filters
              </Button>
            </Box>
            <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
              {handleDeleteSearch && search && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Search"}
                  variant="outlined"
                  onDelete={handleDeleteSearch}
                />
              )}
              {handleDeleteSearchId && searchId && (
                <Chip
                  size="small"
                  color="warning"
                  label={
                    newSearchIdLabel?.length > 10
                      ? "Search ID"
                      : newSearchIdLabel
                  }
                  variant="outlined"
                  onDelete={handleDeleteSearchId}
                />
              )}
              {handleDeleteStatus && status && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Status"}
                  variant="outlined"
                  onDelete={handleDeleteStatus}
                />
              )}
              {handleDeleteCategory && category && (
                <Chip
                  size="small"
                  color="warning"
                  label={categoryLabel}
                  variant="outlined"
                  onDelete={handleDeleteCategory}
                />
              )}
              {handleDeleteUserName && userName && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Game Name"}
                  variant="outlined"
                  onDelete={handleDeleteUserName}
                />
              )}
              {handleDeleteMinAmount && minAmount && (
                <Chip
                  size="small"
                  color="warning"
                  label={newMinAmountLabel}
                  variant="outlined"
                  onDelete={handleDeleteMinAmount}
                />
              )}
              {handleDeleteMaxAmount && maxAmount && (
                <Chip
                  size="small"
                  color="warning"
                  label={newMaxAmountLabel}
                  variant="outlined"
                  onDelete={handleDeleteMaxAmount}
                />
              )}
              {handleDeleteMinWonAmount && minWonAmount && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Min. Won Amount"}
                  variant="outlined"
                  onDelete={handleDeleteMinWonAmount}
                />
              )}
              {handleDeleteMaxWonAmount && maxWonAmount && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Max. Won Amount"}
                  variant="outlined"
                  onDelete={handleDeleteMaxWonAmount}
                />
              )}

              {handleDeleteMinOdd && minOdd && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Min. odd"}
                  variant="outlined"
                  onDelete={handleDeleteMinOdd}
                />
              )}
              {handleDeleteMaxOdd && maxOdd && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Max. odd"}
                  variant="outlined"
                  onDelete={handleDeleteMaxOdd}
                />
              )}
              {handleDeleteMinPotentialWin && minPotentialWin && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Min. pot. win"}
                  variant="outlined"
                  onDelete={handleDeleteMinPotentialWin}
                />
              )}
              {handleDeleteMaxPotentialWin && maxPotentialWin && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Max. pot. win"}
                  variant="outlined"
                  onDelete={handleDeleteMaxPotentialWin}
                />
              )}
              {handleDeleteTransactionType && transactionType && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Transaction Type"}
                  variant="outlined"
                  onDelete={handleDeleteTransactionType}
                />
              )}
              {newStartDateLabel && handleDeleteStartDate && startDate && (
                <Chip
                  size="small"
                  color="warning"
                  label={newStartDateLabel}
                  variant="outlined"
                  onDelete={handleDeleteStartDate}
                />
              )}
              {newEndDateLabel && handleDeleteEndDate && endDate && (
                <Chip
                  size="small"
                  color="warning"
                  label={newEndDateLabel}
                  variant="outlined"
                  onDelete={handleDeleteEndDate}
                />
              )}
              {handleDeleteLastLoginDate && lastLoginDate && (
                <Chip
                  size="small"
                  color="warning"
                  label={"Last Login Date"}
                  variant="outlined"
                  onDelete={handleDeleteLastLoginDate}
                />
              )}
            </Box>
          </Box>
        </Menu>

        {showDownloadButton && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<FileDownloadRoundedIcon />}
            onClick={() => {
              if (handleDownloadCSV) {
                handleDownloadCSV();
              }
            }}
          >
            Download CSV
          </Button>
        )}
      </Box>
    </Toolbar>
  );
};

export default CustomTableFilter;
