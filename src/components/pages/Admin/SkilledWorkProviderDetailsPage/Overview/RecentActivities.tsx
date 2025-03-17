import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import MachineImg from "src/assets/tempimages/machine1.jpg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";

dayjs.extend(relativeTime);

type CategoryInfoBoxProps = {
  image: string;
  title: string;
  caption1: string;
  caption2?: string;
  direction?: "row" | "column";
};
const CategoryInfoBox = ({
  image,
  title,
  caption1,

  direction = "row",
}: CategoryInfoBoxProps) => {
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
          src={image}
          alt="product"
          style={{
            width: direction === "column" ? "42px" : "56px",
            height: direction === "column" ? "42px" : "56px",
            objectFit: "cover",
            borderRadius: "50%",
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
            fontSize: "11.5px",
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,

            overflow: "hidden",
          }}
        >
          {caption1} Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Saepe laudantium mollitia amet!
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 1,
            my: 0.5,
          }}
        >
          <Chip
            size="small"
            variant="filled"
            label={"No.4, goodluck street, to the city, Nigeria"}
          />
          <Chip
            size="small"
            variant="filled"
            color="info"
            label={"Plumber"}
            sx={{ background: "#47B48E0D", color: "#47B48E" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
const RecentActivities = () => {
  return (
    <Box
      component={Paper}
      sx={{ mb: 1, p: 1, borderRadius: "20px" }}
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
        <ProfileTitle text="Map Activities" />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CategoryInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`20000`}
        />
        <Chip
          size="small"
          color="default"
          label={dayjs("2023-01-01").fromNow()}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CategoryInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`20000`}
        />
        <Chip
          size="small"
          color="default"
          label={dayjs("2023-01-01").fromNow()}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CategoryInfoBox
          image={MachineImg}
          title="Oriano Ket"
          caption1={`260000`}
        />
        <Chip
          size="small"
          color="default"
          label={dayjs("2023-01-01").fromNow()}
        />
      </Box>
    </Box>
  );
};

export default RecentActivities;
