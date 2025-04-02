import { useEffect, useState } from "react";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
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
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
// import { LuEyeClosed } from "react-icons/lu";
// import { RxEyeOpen } from "react-icons/rx";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { AgentType } from "src/types/agents";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// import { MdOutlineCancel } from "react-icons/md";
type Props = {
  open: boolean;
  selectedAgent: AgentType;
  handleClose: () => void;
};

function EditAgentDialog({ open, selectedAgent, handleClose }: Props) {
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  // const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const queryClient = useQueryClient();

  const handleChangeState = (
    event: SelectChangeEvent<typeof selectedStates>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedStates(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

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
  type FormType = {
    email: string;
    name: string;
    gender: string;
    states: string[];
  };
  let initialValues: FormType = {
    email: "",
    name: "",
    gender: "",
    states: [],
  };

  if (selectedAgent) {
    initialValues.name = selectedAgent.name;
    initialValues.email = selectedAgent.email;
    initialValues.gender = selectedAgent.gender;
  }
  useEffect(() => {
    let newStates = [...selectedAgent?.states.map((item) => item.state)];
    setSelectedStates(newStates);
    return () => {
      setSelectedStates([]);
    };
  }, [open]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      setDefaultHeaders();
      if (selectedStates?.length === 0) {
        return toast.error("Select at least a state to add an agent");
      }
      try {
        values.states = selectedStates;

        helpers.setSubmitting(true);
        const res = await axios.put(
          `${baseUrl}/admin/agents/${selectedAgent?.id}`,
          values
        );
        // const res = await axios.post(`${baseUrl}/auth/login`, values);
        // console.log("xxxxxxxxxxxxxxxxxxxxxxx", res?.data?.access_token);
        await queryClient.invalidateQueries({
          queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_AGENTS],
        });
        toast.success(formatSuccessMessage(res?.data));
        handleClose();
      } catch (error) {
        helpers.setSubmitting(false);
        let errMsg = formatErrorMessage(error);

        return toast.error(errMsg);
      }
    },
    validationSchema: yup.object().shape({
      email: yup.string().required().label("Email"),
      name: yup.string().required().label("Name"),
      gender: yup.string().required().label("Gender"),
    }),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = formik;
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
            Edit Agent Profile
          </Typography>
          <DialogCloseButtonWrapper>
            <IconButton onClick={handleClose} color="error">
              <HighlightOffRoundedIcon />
            </IconButton>
          </DialogCloseButtonWrapper>
        </Box>
      </DialogActions>
      <DialogContent>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Enter Agent's Name</InputLabel>
              <OutlinedInput
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Enter Agent's Name"
              />
              {touched.name && errors.name && (
                <FormHelperText error>{errors.name}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Email Address</InputLabel>
              <OutlinedInput
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email Address"
              />
              {touched.email && errors.email && (
                <FormHelperText error>{errors.email}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Assign State
              </InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={selectedStates}
                onChange={handleChangeState}
                input={<OutlinedInput label="Assign State" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {nigeriaStatesOnly.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={selectedStates.includes(name)} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ my: 1 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Gender"
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
              {touched.gender && errors.gender && (
                <FormHelperText error>{errors.gender}</FormHelperText>
              )}
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
              type="submit"
              size="large"
              sx={{
                height: "55px",
                minWidth: { xs: "150px", sm: "184px" },
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing" : "Update profile"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </StyledDialog>
  );
}
export default EditAgentDialog;
