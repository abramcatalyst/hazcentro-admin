import { memo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import User from "src/assets/images/logo.png";
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
  data:
    | {
        data: NotificationType[];
      }
    | undefined;
};
const NotificationCard = ({
  data,
  handleSubmitMarkRead,
}: NotificationCardProps) => {
  const theme = useTheme();
  const listItemBtnStyles = {
    display: "flex",
    gap: 1,
    my: 1,
    p: 1,
    background: theme.palette.mode === "dark" ? "#23232399" : "#ffffff",
    borderRadius: "10px",
  };
  return (
    <Box
      sx={listItemBtnStyles}
      onClick={() =>
        handleSubmitMarkRead({
          id: data?.id,
          queryKey: TANSTACK_REQUEST_CACHE_TAGS.FETCH_ADMIN_NOTIFICATIONS,
        })
      }
    >
      <Box>
        <img
          src={User}
          alt="contact"
          style={{
            width: "45px",
            height: "45px",
            objectFit: "cover",
            borderRadius: "50%",
          }}
        />
      </Box>
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
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.common.white
                  : theme.palette.common.black,
            }}
          >
            {data?.user?.name}
          </Typography>
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
          }}
          title={data?.title}
        >
          {data?.title}
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
          {data?.notification}
        </Typography>
      </Box>
    </Box>
  );
};
const NotificationsTable = ({
  isError,
  isPending,
  error,
  data,
  handleSubmitMarkRead,
}: Props) => {
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return <HalfScreenLoader />;
  }

  return (
    <Box>
      <AppHeader text="Notifications" />
      <Box>
        <List sx={{ width: "100%" }} component="nav">
          {data?.data?.length === 0 ? (
            <EmptyTable subText="No notifications found" isSmall />
          ) : (
            data?.data?.map((item) => (
              <NotificationCard
                key={item.id}
                data={item}
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
