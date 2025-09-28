import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import { UserType } from "src/types/users";

const sizing = { xs: 12, sm: 6, md: 4 };

type Props = {
  userData: UserType;
};
const DocumentInfo = ({ userData }: Props) => {
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
      <Box my={2}>
        <Grid container spacing={1}>
          {userData?.vendor?.documents?.map((item) => (
            <Grid key={item?.document_type} size={sizing}>
              <ProfileInfoBox
                title={item?.document_type}
                value={item?.file_urls[0]}
                enablePreview
                enableDownload
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DocumentInfo;
