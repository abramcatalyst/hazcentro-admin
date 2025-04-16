import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import MedalImg from "src/assets/images/star-medal.png";
import Star1Img from "src/assets/images/star-ticket.png";
import Star2Img from "src/assets/images/star-ticket-2.png";
import { currencyFormater } from "src/utils";
import { UserType } from "src/types/users";

type StatsBoxProps = {
  title: string;
  image: string;
  value: string | number;
};
export const StatsBox = ({ title, image, value }: StatsBoxProps) => {
  return (
    <Box
      sx={{
        borderRadius: "6px",
        my: 0.6,
        height: "42px",
        display: "flex",
        gap: 0.9,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={image} alt={title} style={{ width: "60px", height: "60px" }} />
      <Box>
        <Typography sx={{ fontSize: "21px", fontWeight: 500 }}>
          {currencyFormater(value)}
        </Typography>
        <Typography sx={{ fontSize: "12px" }}>{title}</Typography>
      </Box>
    </Box>
  );
};
type Props = {
  selectedUser: UserType;
};
function DistributorStats({ selectedUser }: Props) {
  const theme = useTheme();
  const thisYear = new Date().getFullYear();
  const createdYear = new Date(selectedUser?.created_at).getFullYear();

  return (
    <Box
      sx={{
        my: 1,
        background: alpha(theme.palette.error.light, 0.05),
        p: 0.5,
        borderRadius: "20px",
        minHeight: "120px",
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <StatsBox title="Total Products" value={2300} image={Star1Img} />

      <StatsBox title="Successful Sales" value={456} image={Star2Img} />

      <StatsBox
        title="Years Selling"
        value={thisYear - createdYear}
        image={MedalImg}
      />
    </Box>
  );
}
export default DistributorStats;
