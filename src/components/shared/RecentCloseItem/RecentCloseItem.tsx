import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MdOutlineStar } from "react-icons/md";
type RecentCloseItemProps = {
  image: string;
  title: string;
  caption1: string;
  caption2?: string;
  rating: number;
};
const RecentCloseItem = ({
  image,
  title,
  caption1,
  caption2,
  rating,
}: RecentCloseItemProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
      }}
    >
      <Box>
        <img
          src={image}
          alt="product"
          style={{
            width: "54px",
            height: "54px",
            objectFit: "cover",
            borderRadius: "6px",
            marginTop: "2px",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "15px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          {caption1}
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Typography
            sx={{
              color: "GrayText",
              fontSize: "13px",
            }}
          >
            {caption2}
          </Typography>
          <Box sx={{ display: "flex", gap: 0.1, alignItems: "center" }}>
            {Array.from(Array(5).keys(), (x) => x + 1)?.map((a, idx) => (
              <MdOutlineStar
                key={a}
                style={{
                  fontSize: "12px",
                  color: idx < rating ? `gold` : `grey`,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default RecentCloseItem;
