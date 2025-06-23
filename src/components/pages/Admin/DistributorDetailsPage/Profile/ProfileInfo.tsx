import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";
import { UserType } from "src/types/users";
import { VendorOverviewType } from "src/types/vendor";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };

type Props = {
  userData: UserType;
  vendorOverviewData: VendorOverviewType;
};
const ProfileInfo = ({ vendorOverviewData }: Props) => {
  return (
    <Box my={2}>
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Business Name"
            value={vendorOverviewData?.profile?.business_name}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Biz. Reg. Number"
            value={vendorOverviewData?.profile?.business_reg_no || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Nature of Business"
            value={vendorOverviewData?.profile?.nature_of_business || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Sector Industry"
            value={vendorOverviewData?.profile?.sector_industry || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Website"
            value={vendorOverviewData?.profile?.website || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Biz. Phone Number"
            value={vendorOverviewData?.profile?.biz_phone_number || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Your Role/Position"
            value={vendorOverviewData?.profile?.role_position || "N/A"}
          />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox
            title="Means of ID"
            value={vendorOverviewData?.profile?.means_of_id || "N/A"}
          />
        </Grid>
        {/* <Grid size={sizing}>
          <ProfileInfoBox title="ID No." 
          value={vendorOverviewData?.profile?.business_reg_no || 'N/A'} />
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default ProfileInfo;
