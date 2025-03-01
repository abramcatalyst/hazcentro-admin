import Typography from "@mui/material/Typography";

type Props = {
  text: string;
};
const ProfileTile = ({ text }: Props) => {
  return (
    <Typography
      gutterBottom
      sx={{
        fontSize: { xs: "15px", sm: "17px", fontWeight: { xs: 500, sm: 600 } },
      }}
    >
      {text}
    </Typography>
  );
};

export default ProfileTile;
