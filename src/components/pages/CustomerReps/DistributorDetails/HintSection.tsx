import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const hintsList = [
  {
    title: "Message",
    body: "Directly send a message to the vendor, detailing the issues at hand",
  },
  {
    title: "Decline",
    body: "Means the vendor or distributor does not meet up with the expected requirement",
  },
  {
    title: "Update",
    body: "Approved one or more document, but have one or more default, so the vendor sees the approved one and the default one that needs re-uploading or update",
  },
  {
    title: "Accept",
    body: "All documents met all specified requirement.",
  },
];
const HintSection = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.grey[100],
        my: 2,
        borderRadius: "24px",
        py: { xs: 1, sm: 2 },
        px: { xs: 1, sm: 2 },
      }}
    >
      <Box sx={{ my: 1.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          &middot; Hint :
        </Typography>
      </Box>
      <Box>
        {hintsList.map((item) => {
          return (
            <Box key={item.title} sx={{ my: 1 }}>
              <Typography variant="subtitle2">
                <Typography component="span" sx={{ fontWeight: 600 }}>
                  &middot; {item.title} :
                </Typography>{" "}
                <Typography variant="subtitle2" component={"span"}>
                  {item.body}
                </Typography>
              </Typography>
            </Box>
          );
        })}
      </Box>
      {/* {selectedUsers?.size > 0 && <CustomDeleteButton />} */}
    </Box>
  );
};

export default HintSection;
