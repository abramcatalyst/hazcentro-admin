import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import UserHeader from "../UserHeader";
import ProfileDetailsSection from "./ProfileDetailsSection";
import RecentClose from "../Overview/RecentClose";
import UsersProfileTab from "./UsersProfileTab";
import { useState } from "react";
import ProfileSubDetails from "./ProfileSubDetails";
import SkillsSection from "./SkillsSection";
import WorksTable from "./WorksTable";
import DocumentSection from "./DocumentSection";
import RecentNotifications from "../RecentNotifications";

export const tabOptionsObj = {
  SKILLS: "SKILLS",
  PROFILE: "PROFILE",
  WORKS_PORTFOLIO: "WORKS_PORTFOLIO",
  DOCUMENT: "DOCUMENT",
};
export const profileTabOptions = [
  {
    title: "Profile Info",
    value: tabOptionsObj.PROFILE,
  },
  {
    title: "Skills",
    value: tabOptionsObj.SKILLS,
  },

  {
    title: "Works Portfolio",
    value: tabOptionsObj.WORKS_PORTFOLIO,
  },
  {
    title: "Documents",
    value: tabOptionsObj.DOCUMENT,
  },
];

const ProfileWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(profileTabOptions[0].value);

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }}>
          <UserHeader />
          <ProfileSubDetails />
          <UsersProfileTab
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          {selectedTab === tabOptionsObj.PROFILE && <ProfileDetailsSection />}
          {selectedTab === tabOptionsObj.SKILLS && <SkillsSection />}
          {selectedTab === tabOptionsObj.WORKS_PORTFOLIO && <WorksTable />}
          {selectedTab === tabOptionsObj.DOCUMENT && <DocumentSection />}
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <RecentNotifications />
          <RecentClose />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileWrapper;
