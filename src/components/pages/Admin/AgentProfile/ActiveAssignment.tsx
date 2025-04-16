import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import MachineImg from "src/assets/tempimages/machine1.jpg";
import ProductInfoBox from "src/components/shared/ProductInfoBox/ProductInfoBox";
import { AgentProfileProps } from "./ProfileInformation";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import { formatErrorMessage } from "src/utils";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

const ActiveAssignment = ({
  isPending,
  isError,
  error,
  data,
}: AgentProfileProps) => {
  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }
  if (isPending) {
    return (
      <Box>
        <Skeleton sx={{ my: 1, height: "60px" }} />
        <Skeleton sx={{ my: 1, height: "60px" }} />
      </Box>
    );
  }

  return (
    <Box
      component={Paper}
      sx={{ my: 1, p: 1, borderRadius: "20px" }}
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
          Active Assignment
        </Typography>
      </Box>
      {data?.recent_orders?.length === 0 ? (
        <EmptyTable subText="No recent orders" />
      ) : (
        <>
          {data?.recent_orders?.map((item) => (
            <Box
              key={item?.id}
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ProductInfoBox
                image={MachineImg}
                title="Oriano Ket"
                caption1={`SKU:45678fd`}
              />
              <Button
                size="small"
                color="inherit"
                sx={{ background: "#FFFAE8" }}
              >
                View details
              </Button>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default ActiveAssignment;
