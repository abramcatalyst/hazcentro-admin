import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MachineImg from "src/assets/tempimages/user1.png";
import ProfileTile from "src/components/shared/ProfileTitle/ProfileTile";

type RequestInfoBoxProps = {
  image: string;
  title: string;
  caption1: string;
  direction?: "row" | "column";
};
const RequestInfoBox = ({
  image,
  title,
  caption1,
  direction = "row",
}: RequestInfoBoxProps) => {
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
      <Box sx={{ maxWidth: "500px" }}>
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
      </Box>
    </Box>
  );
};

type StatusBoxProps = {
  status: boolean;
};
const StatusBox = ({ status }: StatusBoxProps) => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "25px",
        py: 0.4,
        px: 0.9,
        width: "112px",
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          color: status ? "#01AA89" : "#EE1616",
          textAlign: "center",
        }}
      >
        {status ? "Successful" : "Not Successful"}
      </Typography>
    </Box>
  );
};
const SavedWorkersSection = () => {
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
      <Box sx={{ my: 1 }}>
        <ProfileTile text="Requests" />
      </Box>

      {[1, 2, 3].map((item, idx) => (
        <Box
          key={item}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            background: "#F7F7F980",
            py: 2,
            px: 1,
            borderRadius: "20px",
            mb: 1,
          }}
        >
          <RequestInfoBox
            image={MachineImg}
            title="Olayinka Adebanjo"
            caption1={`Plumbers Experience`}
          />

          <StatusBox status={idx % 2 === 0 ? true : false} />
        </Box>
      ))}
    </Box>
  );
};

export default SavedWorkersSection;
