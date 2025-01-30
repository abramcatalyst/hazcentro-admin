import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GtcoImg from "src/assets/tempimages/gtco.png";
import { useTheme } from "@mui/material/styles";

type TransactionCardProps = {
  bankName: string;
};
const SavedAccounts = () => {
  const theme = useTheme();
  const TransactionCard = ({ bankName }: TransactionCardProps) => {
    return (
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          background: "#FCFCFC",
          border: `1px solid ${theme.palette.grey[100]}`,
          py: 1,
          px: 0.7,
          borderRadius: "16px",
          mb: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            background: theme.palette.common.white,
          }}
        >
          <Box
            sx={{
              borderRadius: "6px",
              width: "52px",
              height: "52px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={GtcoImg}
              alt="trans"
              style={{ width: "52px", height: "52px", objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 500, fontSize: "18px" }}>
              {bankName}
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                color: "GrayText",
              }}
            >
              GTB - 23476237423
            </Typography>
          </Box>
        </Box>
        <Button color="success" variant="text">
          View
        </Button>
      </Box>
    );
  };
  return (
    <Box
      sx={{
        my: 1,
        p: { xs: 1 },
        background: "#ffffff",
        borderRadius: "20px",
      }}
    >
      <Box
        sx={{
          mt: 2,
          mb: 1,
          display: "flex",
          gap: 1,
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle2" pl={1} gutterBottom>
          Saved Account
        </Typography>
        <Button
          color="inherit"
          size="small"
          sx={{
            background: theme.palette.grey[100],
            "&:hover": { background: theme.palette.grey[200] },
          }}
        >
          Add new
        </Button>
      </Box>
      <Box sx={{ my: 1, maxHeight: "300px", overflowY: "auto" }}>
        <TransactionCard bankName={"Ola Wals"} />
      </Box>
    </Box>
  );
};

export default SavedAccounts;
