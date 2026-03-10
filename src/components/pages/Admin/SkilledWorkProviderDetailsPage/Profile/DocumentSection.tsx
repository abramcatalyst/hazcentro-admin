import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerDocuments } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  FULL_DATE_FORMAT,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useState } from "react";
import axios from "axios";
import { WorkerDocumentType } from "src/types/workers";
import toast from "react-hot-toast";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const DocumentSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState<WorkerDocumentType | null>(null);
  const { id } = useParams();
  const theme = useTheme();
  const { error, data, isError, isPending } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_WORKER_DOCUMENTS, { id }],
    queryFn: () => fetchWorkerDocuments({ id }),
  });
  const queryClient = useQueryClient();

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelected(null);
  };
  const handleSubmit = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const res = await axios.post(
        `${baseUrl}/admin/workers/${id}/documents/${selected?.id}/review`,
        {
          status: selected?.status === "declined" ? "approved" : "declined",
        },
      );

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_WORKER_DOCUMENTS],
      });
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);
      handleCloseConfirm();
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={Paper}
      sx={{
        p: 1,
        mb: 1,
        width: "100%",
      }}
      elevation={0}
    >
      {openConfirm && selected && (
        <GeneralConfirmDialog
          open={openConfirm}
          hint={
            selected?.status === "approved"
              ? `Do you wish to reject this document`
              : `Kindly confirm to approve this document`
          }
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
          handleClose={handleCloseConfirm}
        />
      )}
      {data?.data?.length === 0 ? (
        <EmptyTable subText="No documents uploaded yet..." />
      ) : (
        <Box>
          {data?.data?.map((item) => {
            return (
              <Box
                my={2}
                key={item?.id}
                sx={{
                  py: 1,
                  borderTop: `1px solid ${theme.palette.grey[100]}`,
                  borderBottom: `1px solid ${theme.palette.grey[100]}`,
                }}
              >
                <Grid container spacing={1}>
                  <Grid size={sizing}>
                    <ProfileInfoBox
                      title="ID Type"
                      value={item?.document_type}
                    />
                  </Grid>
                  <Grid size={sizing}>
                    <ProfileInfoBox
                      title="ID Number"
                      value={item?.document_id_number || "N/A"}
                    />
                  </Grid>
                  <Grid size={sizing}>
                    <ProfileInfoBox
                      title="Status"
                      value={item?.status}
                      valueTextColor={
                        item?.status === "approved"
                          ? theme.palette.success.main
                          : theme.palette.error.main
                      }
                    />
                  </Grid>

                  <Grid size={sizing}>
                    <ProfileInfoBox
                      title={`${item?.document_type} ${item?.document_id_number ?? "Doc."}`}
                      value={item?.media_url}
                      enablePreview
                      enableDownload
                    />
                  </Grid>
                </Grid>
                <Typography
                  sx={{
                    mt: 0.4,
                    color: "GrayText",
                    fontStyle: "italic",
                    fontSize: "12px",
                  }}
                  variant="subtitle2"
                >
                  Uploaded at:{" "}
                  {dayjs(item?.created_at).format(FULL_DATE_FORMAT)} &nbsp; Last
                  updated at: {dayjs(item?.updated_at).format(FULL_DATE_FORMAT)}
                </Typography>

                <Box sx={{ mt: 1.1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    color={item?.status === "approved" ? "error" : "success"}
                    sx={{ width: "170px" }}
                    onClick={() => {
                      setOpenConfirm(true);
                      setSelected(item);
                    }}
                  >
                    {item?.status === "approved"
                      ? "Reject Document"
                      : "Approve Document"}
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default DocumentSection;
