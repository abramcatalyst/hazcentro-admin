import { Dispatch, SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import {
  baseUrl,
  currencyFormater,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import axios from "axios";

import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import { fetchSubscriptionsPlans } from "src/services/subscriptions";
import { SubscriptionType } from "src/types/subscriptions";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type Props = {
  handleOpenEditDiscount: (val: SubscriptionType) => void;
  selectedSubscription: SubscriptionType | null;
  setSelectedSubscription: Dispatch<SetStateAction<SubscriptionType | null>>;
};
function ManageSubscriptions({
  selectedSubscription,
  handleOpenEditDiscount,
  setSelectedSubscription,
}: Props) {
  const [openDelete, setOpenDelete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const { isError, error, isLoading, data } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SUBSCRIPTION_PLANS, {}],
    queryFn: () => fetchSubscriptionsPlans({ limit: 1000, page: 1 }),
  });

  const handleOpenDeleteDialog = (val: SubscriptionType) => {
    setSelectedSubscription(val);
    setOpenDelete(true);
  };
  const handleCloseDeleteDialog = () => {
    setSelectedSubscription(null);
    setOpenDelete(false);
  };
  const handleSubmitDelete = async () => {
    setDefaultHeaders();

    try {
      setIsSubmitting(true);
      const res = await axios.delete(
        `${baseUrl}/admin/subscriptions/${selectedSubscription?.id}`
      );

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SUBSCRIPTION_PLANS],
      });
      toast.success(formatSuccessMessage(res?.data));
      handleCloseDeleteDialog();
    } catch (error) {
      let errMsg = formatErrorMessage(error);

      return toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isLoading) {
    return <HalfScreenLoader />;
  }
  return (
    <Box sx={{ my: 1 }}>
      {openDelete && selectedSubscription && (
        <GeneralConfirmDialog
          hint={`Do you really want to delete this (${selectedSubscription?.name}) subscription?`}
          open={openDelete}
          isSubmitting={isSubmitting}
          handleClose={handleCloseDeleteDialog}
          handleSubmit={handleSubmitDelete}
        />
      )}
      <Box>
        {data && data?.total > 0 ? (
          <Box>
            {data &&
              data?.data?.length > 0 &&
              data?.data?.map((row) => (
                <Box key={row?.id} component={Paper} sx={{ p: 1, mb: 0.7 }}>
                  <Box
                    sx={{
                      px: 0.5,
                      py: 1,
                      my: 1,
                      borderBottom: `1px solid ${theme.palette.grey[300]}`,
                      display: "flex",
                      gap: { xs: 1, sm: 2 },
                      alignItems: "center",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: { xs: 1, sm: 2 },
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <Typography sx={{ fontWeight: { xs: 600, sm: 800 } }}>
                        {row?.name}
                      </Typography>
                      <Chip
                        label={row?.type}
                        variant="outlined"
                        color="success"
                        size="small"
                      />
                      <Typography sx={{ fontWeight: 500 }}>
                        &#8358;{currencyFormater(row?.price)}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {row?.user_type}
                      </Typography>

                      {renderStatus(row?.status)}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        color="error"
                        onClick={() => {
                          handleOpenDeleteDialog(row);
                        }}
                      >
                        <DeleteForeverOutlinedIcon />
                      </IconButton>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => {
                          handleOpenEditDiscount(row);
                        }}
                      >
                        Edit
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ mt: 2, mb: 1, p: 0.5 }}>
                    <Typography>{row?.description}</Typography>{" "}
                  </Box>
                </Box>
              ))}
          </Box>
        ) : (
          <EmptyTable subText="No subscriptions created yet" />
        )}
      </Box>
    </Box>
  );
}
export default ManageSubscriptions;
