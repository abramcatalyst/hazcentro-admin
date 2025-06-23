import AvatarFemaleImg from "src/assets/images/avatar-female.png";
import AvatarMaleImg from "src/assets/images/avatar-male.png";
import DefaultImg from "src/assets/images/default-user.png";

const renderUserProfileImage = ({
  remoteImageUrl,
  gender,
}: {
  remoteImageUrl: string | null;
  gender?: string;
}): string => {
  let res = DefaultImg;

  if (remoteImageUrl) {
    res = remoteImageUrl;
  }
  if (!remoteImageUrl && gender && gender?.toLowerCase()?.includes("female")) {
    res = AvatarFemaleImg;
  }

  if (!remoteImageUrl && gender && gender?.toLowerCase() === "male") {
    res = AvatarMaleImg;
  }

  return res;
};

export default renderUserProfileImage;
