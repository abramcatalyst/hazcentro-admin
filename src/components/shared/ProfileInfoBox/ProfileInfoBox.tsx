import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { MdOutlineFileDownload } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import { GLOBAL_COLORS } from "src/utils";
import PreviewDialog from "./PreviewDialog";
import { handleDownloadJPGFile } from "src/utils/index-async";

type ProfileInfoBoxProps = {
  value: string;
  title: string;
  enablePreview?: boolean;
  enableDownload?: boolean;
  fullValueLength?: boolean;
  valueTextColor?: string;
};
const ProfileInfoBox = ({
  value,
  title,
  enableDownload,
  enablePreview,
  fullValueLength,
  valueTextColor,
}: ProfileInfoBoxProps) => {
  const [openPreview, setOpenPreview] = useState(false);

  const handleOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  let splitValue = 16;
  if (fullValueLength) {
    splitValue = value?.length;
  }
  if (enableDownload && enablePreview) {
    splitValue = 11;
  }
  return (
    <Box sx={{ my: 1 }}>
      {openPreview && (
        <PreviewDialog
          open={openPreview}
          handleClose={handleClosePreview}
          value={value}
        />
      )}
      <Box>
        <Typography
          sx={{
            fontSize: "11.8px",
            color: GLOBAL_COLORS.GRAY_800,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.2 }}>
          <Typography
            sx={{
              color: valueTextColor ?? "GrayText",
              fontSize: "14px",
              fontWeight: 600,
            }}
            title={value}
          >
            {value?.substring(0, splitValue)}
            {value?.length > splitValue ? "..." : ""}
          </Typography>{" "}
          {enableDownload && (
            <IconButton
              size="small"
              onClick={() => {
                handleDownloadJPGFile({ url: value, fileName: title });
              }}
            >
              <MdOutlineFileDownload />
            </IconButton>
          )}
          {enablePreview && (
            <IconButton
              size="small"
              onClick={() => {
                handleOpenPreview();
              }}
            >
              <LuEye />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileInfoBox;
