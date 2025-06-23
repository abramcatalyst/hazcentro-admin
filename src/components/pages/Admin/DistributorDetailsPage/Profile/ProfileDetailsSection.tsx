import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import QuickActions from "./QuickActions";
import { MdOutlineStar } from "react-icons/md";
import DistributorStats from "./DistributorStats";
import { profileTabOptions, tabOptionsObj } from "./ProfileWrapper";
import ProfileTab from "./ProfileTab";
import ProfileInfo from "./ProfileInfo";
import ProductInfo from "./ProductInfo";
import DocumentInfo from "./DocumentInfo";
import VerifiedIcon from "src/assets/icons/verified_icon_green_1.svg";
import { GLOBAL_COLORS } from "src/utils";
import PaymentInfo from "./PaymentInfo";
import { UserType } from "src/types/users";
import { VendorOverviewType } from "src/types/vendor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015
import renderUserProfileImage from "src/utils/renderUserProfileImage";

dayjs.extend(relativeTime);
type Props = {
  userData: UserType;
  vendorOverviewData: VendorOverviewType;
};
const ProfileDetailsSection = ({ userData, vendorOverviewData }: Props) => {
  const [selectedTab, setSelectedTab] = useState(profileTabOptions[0].value);

  const theme = useTheme();
  const userImage = renderUserProfileImage({
    remoteImageUrl: vendorOverviewData?.profile?.profile_picture_url,
    gender: userData?.gender,
  });
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
      <Box sx={{ my: 1.5 }}>
        <Typography
          sx={{
            fontSize: "17px",
            fontWeight: 500,
          }}
        >
          Profile Info
        </Typography>{" "}
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          background: "#F7F7F97A",
          borderRadius: "20px",
          flexWrap: "wrap",
          py: 2,
          px: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: "wrap",
            width: { xs: "100%", md: "70%" },
            minHeight: "100px",
          }}
        >
          <Box sx={{ borderRadius: "50%" }}>
            <img
              alt="user"
              src={userImage}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                width: "105px",
                height: "105px",
              }}
            />
          </Box>
          <Box sx={{}}>
            <Typography
              sx={{
                fontSize: "19px",
                fontWeight: 500,
              }}
            >
              {userData?.name}
            </Typography>{" "}
            <Box
              sx={{
                my: 0.1,
                py: 0.3,
                px: 0.1,
                display: "flex",
                alignItems: "center",
                gap: 0.4,
              }}
            >
              <Typography variant="body2">
                Followers: {vendorOverviewData?.summary?.follower_count}{" "}
              </Typography>
              <MdOutlineStar
                style={{
                  fontSize: "12px",
                  color: `gold`,
                }}
              />
              <MdOutlineStar
                style={{
                  fontSize: "12px",
                  color: `gold`,
                }}
              />
              <MdOutlineStar
                style={{
                  fontSize: "12px",
                  color: `gold`,
                }}
              />
              <MdOutlineStar
                style={{
                  fontSize: "12px",
                  color: `gold`,
                }}
              />
              <MdOutlineStar
                style={{
                  fontSize: "12px",
                  color: `grey`,
                }}
              />
            </Box>{" "}
            <Typography
              sx={{
                fontSize: "12px",

                color: theme.palette.grey[800],
              }}
            >
              User ID: {userData?.unique_user_id}
            </Typography>{" "}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            alignItems: "flex-end",
            flexWrap: "wrap",
          }}
        >
          {userData?.last_seen_at ? (
            <Typography
              sx={{
                fontSize: "12px",
                lineHeight: "80%",
                color: theme.palette.grey[800],
              }}
            >
              Last Seen: {dayjs(userData?.last_seen_at).fromNow()}
            </Typography>
          ) : null}{" "}
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "80%",

              color: theme.palette.grey[800],
            }}
          >
            &middot; Registered
          </Typography>{" "}
        </Box>
      </Box>
      <Box sx={{}}>
        <DistributorStats vendorOverviewData={vendorOverviewData} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <ProfileTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            background: "#47B48E12",
            borderRadius: "4px",
            py: 0.4,
            px: 1,
          }}
        >
          <img
            src={VerifiedIcon}
            alt="verified"
            style={{ width: "24px", height: "24px" }}
          />
          <Box>
            <Typography
              sx={{ fontSize: "10px", color: GLOBAL_COLORS.GREEN_MAIN }}
            >
              Verified
            </Typography>
            <Typography sx={{ fontSize: "8px", color: "GrayText" }}>
              Wal Yaks
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box my={2}>
        {selectedTab === tabOptionsObj.PROFILE ? (
          <ProfileInfo
            userData={userData}
            vendorOverviewData={vendorOverviewData}
          />
        ) : null}
        {selectedTab === tabOptionsObj.PRODUCTS ? <ProductInfo /> : null}
        {selectedTab === tabOptionsObj.DOCUMENTS ? <DocumentInfo /> : null}
        {selectedTab === tabOptionsObj.PAYMENT ? <PaymentInfo /> : null}
      </Box>
      <QuickActions />
    </Box>
  );
};

export default ProfileDetailsSection;
