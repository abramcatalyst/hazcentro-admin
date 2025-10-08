import { memo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { formatErrorMessage } from "src/utils";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import {
  MarkNotificationReadPayloadType,
  NotificationType,
} from "src/types/notification";
import AppHeader from "src/components/shared/AppHeader/AppHeader";

dayjs.extend(relativeTime);
type NotificationCardProps = {
  data: NotificationType;
  isSubmitting: boolean;
  handleSubmitMarkRead: ({
    id,
    queryKey,
  }: MarkNotificationReadPayloadType) => Promise<string | undefined>;
};
type Props = {
  handleSubmitMarkRead: ({
    id,
    queryKey,
  }: MarkNotificationReadPayloadType) => Promise<string | undefined>;
  error: Error | null;
  isPending: boolean;
  isError: boolean;
  data: NotificationType[] | undefined;
  isSubmitting: boolean;
  handleClearAllNotifications: () => Promise<string | undefined>;
};
const NotificationCard = ({
  data,
  isSubmitting,
  handleSubmitMarkRead,
}: NotificationCardProps) => {
  const theme = useTheme();
  const listItemBtnStyles = {
    display: "flex",
    gap: 1,
  };
  return (
    <Box
      sx={{
        mb: 1,
        p: 1,
        borderRadius: "10px",
        background: theme.palette.mode === "dark" ? "#23232399" : "#ffffff",
      }}
    >
      <Box sx={listItemBtnStyles}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[300]
                    : theme.palette.common.black,
              }}
            >
              {dayjs(data?.created_at).fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              mb: 0.4,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          >
            {data?.type?.split("_")?.map((item) => `${item} `)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {data?.message}
          </Typography>
        </Box>
      </Box>
      <Button
        color="success"
        disabled={isSubmitting}
        size="small"
        onClick={() =>
          handleSubmitMarkRead({
            id: data?.id,
            queryKey: TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_NOTIFICATIONS,
          })
        }
      >
        Mark as read
      </Button>
    </Box>
  );
};
const NotificationsTable = ({
  isError,
  isPending,
  error,
  data,
  isSubmitting,
  handleSubmitMarkRead,
  handleClearAllNotifications,
}: Props) => {
  const theme = useTheme();
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  return (
    <Box>
      <AppHeader text="Notifications" />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
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
      <Box>
        <List sx={{ width: "100%" }} component="nav">
          {data?.length === 0 ? (
            <EmptyTable
              mainText="No Notifications"
              subText="No notifications found"
              isSmall
            />
          ) : (
            data?.map((item) => (
              <NotificationCard
                key={item.id}
                data={item}
                isSubmitting={isSubmitting}
                handleSubmitMarkRead={handleSubmitMarkRead}
              />
            ))
          )}
        </List>
      </Box>
    </Box>
  );
};

export default memo(NotificationsTable);
