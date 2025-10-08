import { useState } from "react";
import Box from "@mui/material/Box";

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
    queryFn: () => fetchNotifications({ limit: 50, status: "false" }),
    refetchInterval: 30000,
  });

  const handleSubmitMarkRead = async ({
    id,
  }: MarkNotificationReadPayloadType) => {
    try {
      setDefaultHeaders();
      setIsSubmitting(true);

      const payload = { is_read: true };
      await axios.post(`${baseUrl}/global/notifications/${id}/read`, payload);
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

  const handleClearAllNotifications = async () => {
    if (!data || (data && data?.length === 0)) {
      return;
    }
    try {
      setDefaultHeaders();
      setIsSubmitting(true);

      const payload = [...data?.map((item) => item.id)];
      await axios.post(`${baseUrl}/global/notifications/read-all`, {
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
  return (
    <Box>
      <Box
        sx={{
          maxWidth: "1000px",
          borderRadius: "5px",
          p: 2,
          margin: "10px auto",
        }}
      >
        <ErrorBoundary FallbackComponent={ErrorFallBack}>
          <NotificationsTable
            isSubmitting={isSubmitting}
            data={data}
            isError={isError}
            isPending={isPending}
            error={error}
            handleSubmitMarkRead={handleSubmitMarkRead}
            handleClearAllNotifications={handleClearAllNotifications}
          />
        </ErrorBoundary>
      </Box>
    </Box>
  );
};

export default AdminNotifications;
