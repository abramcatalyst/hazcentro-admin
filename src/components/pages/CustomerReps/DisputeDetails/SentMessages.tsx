import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import { SingleDisputeType } from "src/types/disputes";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import dayjs from "dayjs";
import { FULL_DATE_FORMAT } from "src/utils";

type Props = {
  data: SingleDisputeType;
};
const SentMessages = ({ data }: Props) => {
  const theme = useTheme();
  return (
    <Box component={Paper} elevation={0} sx={{}}>
      {data?.replies && data?.replies?.length > 0 ? (
        data?.replies?.map((row) => (
          <Box
            key={row?.id}
            sx={{
              mb: 1.8,
              px: { xs: 0.5, sm: 1 },
              background: theme.palette.grey[50],
            }}
          >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", pl: 1 }}>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                }}
              >
                {row?.user?.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: theme.palette.primary.dark,
                }}
              >
                {dayjs(row?.created_at).format(FULL_DATE_FORMAT)}
              </Typography>
            </Box>{" "}
            {row?.attachments && row?.attachments?.length > 0 && (
              <Box
                sx={{
                  height: "120px",
                  width: "290px",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={row?.attachments[0]?.url}
                  alt="attachment"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
                />
              </Box>
            )}
            <Box sx={{ p: { xs: 0.5, sm: 1 } }}>
              <Typography variant="body2">{row?.message}</Typography>
            </Box>
          </Box>
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
            width: "100%",
          }}
        >
          <EmptyTable subText="No previous messages" isSmall />
        </Box>
      )}
    </Box>
  );
};

export default SentMessages;
