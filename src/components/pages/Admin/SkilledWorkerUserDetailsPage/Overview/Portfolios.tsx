import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
import PlaceholderImg from "src/assets/images/placeholder.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { WorkerPortfolioType } from "src/types/workers";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type CategoryInfoBoxProps = {
  data: WorkerPortfolioType;
  direction?: "row" | "column";
};
const CategoryInfoBox = ({ data, direction = "row" }: CategoryInfoBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        gap: direction === "column" ? "2px" : 1,
        alignItems: direction === "column" ? "flex-start" : "center",
      }}
    >
      <Box>
        <img
          src={data?.images[0] ?? PlaceholderImg}
          alt="product"
          style={{
            width: direction === "column" ? "40px" : "50px",
            height: direction === "column" ? "40px" : "50px",
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: "2px",
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            // fontWeight: 500,
            fontSize: "12px",
          }}
        ></Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "11.8px",
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 4,

            overflow: "hidden",
          }}
        >
          {data?.description}
        </Typography>
      </Box>
    </Box>
  );
};
type Props = {
  portfolios: WorkerPortfolioType[];
};
const Portfolios = ({ portfolios }: Props) => {
  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "12px" }}
      elevation={0}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <ProfileTitle text="Portfolio" />
      </Box>
      {portfolios?.length > 0 ? (
        portfolios?.map((item) => {
          return (
            <Box
              key={item?.id}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
                my: 0.4,
                borderBottom: `1px solid`,
                pb: 0.3,
                borderBottomColor: "divider",
              }}
            >
              <CategoryInfoBox data={item} />
              {/* <Button
                size="small"
                color="success"
                sx={{
                  color: "#47B48E",
                  background: "#01AA890D",
                  borderRadius: "25px",
                  fontSize: "12px",
                }}
              >
                View
              </Button> */}
            </Box>
          );
        })
      ) : (
        <EmptyTable subText="No data found" />
      )}
    </Box>
  );
};

export default Portfolios;
