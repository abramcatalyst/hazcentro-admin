import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import AddPolicyForm from "./AddPolicyForm";
import { formatErrorMessage } from "src/utils";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import { fetchReturnPolicy } from "src/services/returnpolicy";
import { useState } from "react";
import EditPolicyForm from "./EditPolicyForm";

const ReturnPolicyWrapper = () => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { isError, error, isLoading, data } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_RETURN_POLICY, {}],
    queryFn: () => fetchReturnPolicy(),
  });

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isLoading) {
    return <HalfScreenLoader />;
  }
  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };
  if (data?.length === 0) {
    return (
      <Box>
        <AddPolicyForm />
      </Box>
    );
  }
  return (
    <Box elevation={0} component={Paper} sx={{ py: 2, px: { xs: 1, sm: 2 } }}>
      {openEditDialog && data && (
        <Dialog
          maxWidth="lg"
          fullWidth
          open={openEditDialog}
          onClose={handleCloseEditDialog}
        >
          <DialogContent>
            <EditPolicyForm
              initData={data[0]}
              handleClose={handleCloseEditDialog}
            />
          </DialogContent>
        </Dialog>
      )}
      <Box>
        <Box
          sx={{
            mt: 1,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            {data && data[0]?.title}
          </Typography>
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              handleOpenEditDialog();
            }}
          >
            Update Policy
          </Button>
        </Box>
        <Box>
          <div
            dangerouslySetInnerHTML={{
              __html: data && data[0]?.content ? data[0]?.content : "",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ReturnPolicyWrapper;
