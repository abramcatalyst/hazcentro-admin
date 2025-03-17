import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MachineImg from "src/assets/images/avatar-male.png";
import { currencyFormater } from "src/utils";
import FollowerInfoBox from "src/components/shared/FollowerInfoBox/FollowerInfoBox";

const FollowersTable = () => {
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
        <Typography sx={{ fontWeight: 500, fontSize: "16px" }}>
          Following ({currencyFormater(40)})
        </Typography>
      </Box>
      <Box>
        {["2", 3, "5", "v"].map((item) => (
          <Box
            key={item}
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <FollowerInfoBox
              image={MachineImg}
              title="Oriano Nig"
              caption1={`User ID: 43ERTY6798`}
            />
            <Button size="small" color="success" sx={{ color: "#47B48E" }}>
              View profile
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default FollowersTable;
