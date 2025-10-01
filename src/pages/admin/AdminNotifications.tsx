import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";
import { baseUrl, formatErrorMessage, setDefaultHeaders } from "src/utils";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MarkNotificationReadPayloadType } from "src/types/notification";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchNotifications } from "src/services/notifications";
import NotificationsTable from "src/components/pages/shared/Notifications/NotificationsTable";

const AdminNotifications = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const queryClient = useQueryClient();
  const { isPending, error, data, isError } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_NOTIFICATIONS, {}],
    queryFn: () =>
      fetchNotifications({ limit: 20, type: "regular", status: "false" }),
  });

  const theme = useTheme();

  const handleSubmitMarkRead = async ({
    id,
    queryKey,
  }: MarkNotificationReadPayloadType) => {
    try {
      setDefaultHeaders();
      setIsSubmitting(true);

      const payload = { is_read: true };
      await axios.post(`${baseUrl}/global/notifications/${id}`, payload);
      // const successMsg = await formatSuccessMessage(res?.data);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // await toast.success(successMsg);
    } catch (error) {
      const errMsg = formatErrorMessage(error);
      return toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearAllNotifications = async () => {
    if (!data || (data && data?.data?.length === 0)) {
      return;
    }
    try {
      setDefaultHeaders();
      setIsSubmitting(true);

      const payload = [...data?.data?.map((item) => item.id)];
      await axios.post(`${baseUrl}/global/notifications/mark/all`, {
        ids: payload,
      });
      // const successMsg = await formatSuccessMessage(res?.data);
      queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_NOTIFICATIONS],
      });
      // await toast.success(successMsg);
    } catch (error) {
      const errMsg = formatErrorMessage(error);
      return toast.error(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("ggggggggggggggggg", data);
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "800px",
          borderRadius: "5px",
          p: 2,
          margin: "10px auto",
        }}
      >
        <Box
          mb={1}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
          }}
        >
          <>
            {isSubmitting ? (
              <CircularProgress size="13px" />
            ) : (
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.primary.main,
                  cursor: "pointer",
                }}
                gutterBottom
                onClick={() => handleClearAllNotifications()}
              >
                Clear all
              </Typography>
            )}
          </>
        </Box>
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <NotificationsTable
            data={data}
            isError={isError}
            isPending={isPending}
            error={error}
            handleSubmitMarkRead={handleSubmitMarkRead}
          />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default AdminNotifications;
