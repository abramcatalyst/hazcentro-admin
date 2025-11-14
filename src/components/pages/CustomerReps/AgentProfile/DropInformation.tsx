import { memo, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { formatErrorMessage, GLOBAL_COLORS } from "src/utils";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat"; // ES 2015
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchCustomerCareDropInformation } from "src/services/agents";
import { useQuery } from "@tanstack/react-query";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import AddDropInfoDialog from "./AddDropInfoDialog";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { DropInformationType } from "src/types/agents";
import UpdateDropInfoDialog from "./UpdateDropInfoDialog";
dayjs.extend(advancedFormat);

const DropInformation = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selected, setSelected] = useState<DropInformationType | null>(null);

  const { error, data, isError, isLoading } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENT_DROP_INFORMATION, {}],
    queryFn: () => fetchCustomerCareDropInformation(),
  });

  const handleCloseAddDropDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenAddDropDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseUpdateDropDialog = () => {
    setOpenEditDialog(false);
    setSelected(null);
  };
  if (isLoading) {
    return <HalfScreenLoader />;
  }
  if (isError) {
    return (
      <Box>
        <HalfScreenError text={formatErrorMessage(error)} />
      </Box>
    );
  }
  return (
    <Box component={Paper} sx={{ p: 1, borderRadius: "20px" }} elevation={0}>
      {openDialog && (
        <AddDropInfoDialog
          open={openDialog}
          handleClose={handleCloseAddDropDialog}
        />
      )}
      {openEditDialog && selected && (
        <UpdateDropInfoDialog
          open={openEditDialog}
          selected={selected}
          handleClose={handleCloseUpdateDropDialog}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => {
            handleOpenAddDropDialog();
          }}
        >
          Add new drop information
        </Button>
      </Box>
      {data && data?.data?.length > 0 ? (
        <Box
          sx={{
            my: 1,
            background: GLOBAL_COLORS.GREY_10,
            borderRadius: "12px",
            p: 0.2,
          }}
        >
          {data?.data?.map((item) => (
            <Box
              key={item?.id}
              component={Paper}
              sx={{ py: 1.4, px: { xs: 0.5, sm: 1 } }}
            >
              <Box>
                <Typography gutterBottom sx={{ fontWeight: 500 }}>
                  {item?.address}, {item?.city}, {item?.country}
                </Typography>
                <Typography gutterBottom>Zip Code:{item?.zip_code}</Typography>
              </Box>{" "}
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  gap: 1,
                  alignItems: { xs: "flex-start", sm: "center" },
                  justifyContent: { xs: "flex-start", sm: "space-between" },
                }}
              >
                <IconButton
                  onClick={() => {
                    setSelected(item);
                    setOpenEditDialog(true);
                  }}
                >
                  <EditRoundedIcon />
                </IconButton>
                <Typography variant="subtitle2" align="right">
                  Added: {dayjs(item?.created_at).format("MMM Do, YYYY")}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      ) : (
        <Box>
          {" "}
          <EmptyTable isSmall subText="No drop information available" />{" "}
        </Box>
      )}
    </Box>
  );
};

export default memo(DropInformation);
