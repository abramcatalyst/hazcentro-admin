import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import { useState } from "react";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const DisputeMessageForm = () => {
  const { id } = useParams();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("message", text);
      if (selectedFile) {
        formData.append("attachments", selectedFile);
      }
      const res = await axios.patch(
        `${baseUrl}/admin/agents/${id}/replies`,
        formData
      );

      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      await queryClient.invalidateQueries({
        queryKey: [
          TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_CUSTOMER_CARE_DISPUTE,
        ],
      });
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
        borderRadius: "20px",
        background: "#ffffff",
      }}
    >
      <Box sx={{ mt: 3, mb: 1.5 }}>
        <OutlinedInput
          size="small"
          multiline
          rows={3}
          fullWidth
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ mb: 0.4 }}
        />
        <Box sx={{ mb: 1.5 }}>
          <Typography sx={{ fontSize: "12px" }}>
            Pick a file (optional)
          </Typography>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />
        </Box>
        <Button
          disabled={isSubmitting || !text || text?.length < 4}
          size="large"
          variant="contained"
          onClick={() => {
            handleSubmit();
          }}
          sx={{ minWidth: "250px", mb: 0.5 }}
        >
          {isSubmitting ? "Sending" : "Send"}
        </Button>
      </Box>
    </Box>
  );
};

export default DisputeMessageForm;
