import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PlaceholderImg from "src/assets/images/placeholder.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { WorkerPortfolioType } from "src/types/workers";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import GeneralConfirmDialog from "src/components/shared/GeneralConfirmDialog/GeneralConfirmDialog";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteWorkerPortfolio } from "src/services/users";
import { formatErrorMessage, formatSuccessMessage } from "src/utils";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

type Props = {
  portfolios: WorkerPortfolioType[];
  allowDelete?: boolean;
  compact?: boolean;
};

const Portfolios = ({
  portfolios,
  allowDelete = true,
  compact = false,
}: Props) => {
  const { id: userId } = useParams();
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selected, setSelected] = useState<WorkerPortfolioType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCloseConfirm = () => {
    if (isSubmitting) {
      return;
    }
    setOpenConfirm(false);
    setSelected(null);
  };

  const handleDelete = async () => {
    if (!userId || !selected) {
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await deleteWorkerPortfolio({
        userId,
        portfolioId: selected.id,
      });

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_WORKER_OVERVIEW],
        }),
        queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_WORKER_FULL_PORTFOLIOS],
        }),
      ]);

      toast.success(formatSuccessMessage(res));
      handleCloseConfirm();
    } catch (error) {
      toast.error(formatErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "12px" }}
      elevation={0}
    >
      {openConfirm && selected && (
        <GeneralConfirmDialog
          open={openConfirm}
          hint="Delete this portfolio item and all its images?"
          isSubmitting={isSubmitting}
          handleSubmit={handleDelete}
          handleClose={handleCloseConfirm}
        />
      )}
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <ProfileTitle text="Portfolio" />
      </Box>
      {portfolios?.length > 0 ? (
        portfolios.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              my: 1,
              borderBottom: "1px solid",
              pb: 1,
              borderBottomColor: "divider",
            }}
          >
            <Typography
              sx={{
                color: "text.primary",
                fontSize: compact ? "12px" : "13px",
                whiteSpace: "pre-wrap",
              }}
            >
              {item.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {(item.images?.length ? item.images : [PlaceholderImg]).map(
                (imageUrl, index) => (
                  <Box
                    key={`${item.id}-${index}`}
                    component="a"
                    href={imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      display: "block",
                      borderRadius: "8px",
                      overflow: "hidden",
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={`Portfolio ${index + 1}`}
                      style={{
                        width: compact ? "72px" : "96px",
                        height: compact ? "72px" : "96px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </Box>
                ),
              )}
            </Box>
            {allowDelete && userId ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  color="error"
                  variant="outlined"
                  onClick={() => {
                    setSelected(item);
                    setOpenConfirm(true);
                  }}
                  sx={{ fontSize: "12px", borderRadius: "25px" }}
                >
                  Delete
                </Button>
              </Box>
            ) : null}
          </Box>
        ))
      ) : (
        <EmptyTable subText="No portfolio uploaded" />
      )}
    </Box>
  );
};

export default Portfolios;
