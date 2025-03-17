import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MachineImg from "src/assets/tempimages/machine1.jpg";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";

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
  caption2,
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
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "13px",
          }}
        >
          {caption2}
        </Typography>
      </Box>
    </Box>
  );
};
const VisitedCategories = () => {
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
        <ProfileTitle text="Visited Categories" />
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
        <Button
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
        </Button>
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
        <Button
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
        </Button>
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
        <Button
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
        </Button>
      </Box>
    </Box>
  );
};

export default VisitedCategories;
