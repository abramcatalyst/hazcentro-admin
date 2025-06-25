import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Logo from "src/assets/images/logo2.png";
import { currencyFormater } from "src/utils";
import { RateType } from "src/types/rates";
import { useTheme } from "@mui/material/styles";
import { MdOutlineStar } from "react-icons/md";
import { FeedType } from "src/types/feeds";

const starsRating = [...Array(5).keys()].map(() =>
  Math.floor(Math.random() * 100)
);
const FeedItem = ({ data }: { data: RateType }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1.4,
        background: theme.palette.grey[50],
        p: 0.5,
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.3,
          p: 0.5,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <img
            src={data?.product?.image_url || Logo}
            style={{
              objectFit: "contain",
              width: "88px",
              height: "88px",
              borderRadius: "8px",
            }}
            alt="logo"
          />{" "}
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              {data?.product?.name}
            </Typography>
            <Typography sx={{ fontSize: "14px" }}>
              &#8358;{currencyFormater(data?.product?.price, 2)}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.8,
              }}
            >
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
                {starsRating?.map((item, idx) => (
                  <MdOutlineStar
                    key={`${item}${idx}${data?.id}`}
                    style={{
                      fontSize: "12px",
                      color:
                        idx < data?.rating ? `gold` : theme.palette.grey[500],
                    }}
                  />
                ))}
              </Box>
              <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
                {dayjs().format("MMM Do, YYYY")}
              </Typography>{" "}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          py: 1.5,
          px: 0.8,
          mb: 0.5,
          background: "#ffffff",
          width: "99%",
          mx: "auto",
          borderRadius: "8px",
        }}
      >
        <Typography variant="body2">{data?.review}</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: 1,
          justifyContent: "flex-end",
          flexWrap: "wrap",
          pr: 2,
        }}
      >
        <Typography
          sx={{
            textAlign: "right",
            fontSize: "13px",
            fontStyle: "italic",
            fontWeight: 600,
          }}
        >
          {data?.user?.name}
        </Typography>
      </Box>
    </Box>
  );
};
console.log(FeedItem);

type Props = {
  data: {
    data: FeedType[];

    meta: {
      current_page: number;
      from: null;
      last_page: number;

      per_page: number;
      to: null;
      total: number;
    };
  };
};
function FeedsTable({ data }: Props) {
  console.log("dddddddddddd", data);
  return (
    <Box
      sx={{
        width: "100%",
        my: 1,
        background: "#ffffff",
        py: 1,
        px: { xs: 0.5, sm: 1 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <Typography sx={{ textAlign: "center" }}>Upcomming</Typography>
      </Box>
    </Box>
  );
}

export default FeedsTable;
