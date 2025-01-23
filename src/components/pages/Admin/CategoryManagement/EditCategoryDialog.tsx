import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import CreateItemNotification from "src/components/shared/CreateItemNotification/CreateItemNotification";
import Cat1 from "src/assets/tempimages/cat1.png";
import Cat2 from "src/assets/tempimages/cat2.png";
import Cat3 from "src/assets/tempimages/cat3.png";
import { useState } from "react";

const images = [Cat1, Cat2, Cat3];
type Props = {
  open: boolean;
  handleClose: () => void;
};

function EditCategoryDialog({ open, handleClose }: Props) {
  const [selectedImage, setSelectedImage] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      fullWidth
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="sm"
    >
      <DialogActions>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            px: { xs: 1, sm: 2 },
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ color: "GrayText" }}>
            Edit Category
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box component={"form"}>
          <Box>
            <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
              <InputLabel>Enter a name for the catalog</InputLabel>
              <OutlinedInput label="Enter a name for the catalog" />
            </FormControl>
          </Box>
          <CreateItemNotification />
          <Box
            sx={{
              mt: 1,
              mb: 2,
              background: "#F7F7F980",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
              p: 1,
            }}
          >
            <Typography gutterBottom variant="body2">
              Customizations
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, py: 1, px: 0.5 }}
            >
              {images?.map((item, idx) => {
                return (
                  <Box
                    key={idx}
                    sx={{
                      width: { xs: "40px", sm: "46px" },
                      height: { xs: "40px", sm: "46px" },
                      borderRadius: "50%",
                      cursor: "pointer",
                      border:
                        selectedImage === item
                          ? `1.5px solid ${theme.palette.primary.main}`
                          : "none",
                    }}
                    onClick={() => {
                      setSelectedImage(item);
                    }}
                  >
                    <img
                      src={item}
                      alt="custom"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
          <br />
          <Divider />
          <Box
            sx={{ my: 3, display: "flex", gap: 1, justifyContent: "flex-end" }}
          >
            <Button
              variant="contained"
              size="large"
              sx={{
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
export default EditCategoryDialog;
