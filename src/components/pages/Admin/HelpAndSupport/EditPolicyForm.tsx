import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import JoditRichTextEditor from "./JoditRichTextEditor";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import axios from "axios";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ReturnPolicyType } from "src/types/returnpolicy";

type Props = {
  initData: ReturnPolicyType;
  handleClose: () => void;
};
const EditPolicyForm = ({ initData, handleClose }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleChangeContent = (val: string) => {
    setContent(val);
  };

  useEffect(() => {
    setTitle(initData?.title);
    setContent(initData?.content);

    return () => {};
  }, []);

  const handleSubmit = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        slug: "privacy-policy",
        title: title,
        content: content,
        is_active: true,
      };
      const res = await axios.put(
        `${baseUrl}/admin/pages/${initData?.id}`,
        payload
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_RETURN_POLICY],
      });
      handleClose();
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Return Policy</Typography>
      </Box>
      <Box>
        <FormControl fullWidth>
          <FormLabel>Return Policy</FormLabel>
          <OutlinedInput
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </FormControl>
        <Box sx={{ my: 1 }}>
          <JoditRichTextEditor
            content={content}
            handleChangeContent={handleChangeContent}
          />
        </Box>
        <Box sx={{ my: 2 }}>
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            size="large"
            disabled={!content || !title || isSubmitting}
          >
            {isSubmitting ? "Processing" : "Submit"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditPolicyForm;
