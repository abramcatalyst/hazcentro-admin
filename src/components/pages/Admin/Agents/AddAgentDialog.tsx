// import { useState } from "react";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MenuItem from "@mui/material/MenuItem";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DialogCloseButtonWrapper from "src/components/shared/DialogCloseButtonWrapper/DialogCloseButtonWrapper";
import { nigeriaStatesOnly } from "src/utils/nigeriaStatesOnly";
import { GrStatusInfo } from "react-icons/gr";
import StyledDialog from "src/components/shared/StyledDialog/StyledDialog";
// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  handleClose: () => void;
};

function AddAgentDialog({ open, handleClose }: Props) {
  // const [selectedStates, setSelectedStates] = useState<Set<string>>(new Set());
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // const handleSelectState = (value: string) => {
  //   setSelectedStates((prev) => new Set(prev).add(value));
  // };

  // const handleDeleteState = (value: string) => {
  //   setSelectedStates((prev) => {
  //     const newSet = new Set(prev);
  //     newSet.delete(value);
  //     return newSet;
  //   });
  // };
  // const filterdStates = nigeriaStatesOnly.filter(
  //   (item) => !selectedStates.has(item)
  // );
  return (
    <StyledDialog
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
            Add Agent
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
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter Agent's Name</InputLabel>
              <OutlinedInput label="Enter Agent's Name" />
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Email Address</InputLabel>
              <OutlinedInput label="Email Address" />
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Assign State</InputLabel>
              <Select
                label="Assign State"
                // onChange={(e) => {
                //   handleSelectState(e.target.value as string);
                // }}
              >
                {nigeriaStatesOnly?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <Box>
              <Typography variant="subtitle2" mb={1}>
                Selected State
              </Typography>
              <Box>
                {selectedStates?.size > 0 &&
                  selectedStates.forEach((item) => (
                    <Box key={`vb${item}`}>
                      <Typography variant="subtitle2">{item}</Typography>{" "}
                      <IconButton color="error" size="small">
                        <MdOutlineCancel />{" "}
                      </IconButton>
                    </Box>
                  ))}
              </Box>
            </Box> */}
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Gender</InputLabel>
              <Select label="Gender">
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box>
              <GrStatusInfo style={{ color: theme.palette.info.main }} />
            </Box>
            <Typography fontSize={"13px"}>
              Note: All changes or modifications made to this effect will be
              available in the next launch of the User App.
            </Typography>
          </Box>

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
              Add Agent
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default AddAgentDialog;
