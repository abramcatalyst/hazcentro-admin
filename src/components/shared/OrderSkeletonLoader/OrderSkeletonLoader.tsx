import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const OrderSkeletonLoader = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          my: 0.4,
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Skeleton sx={{ width: 75, height: 72 }} />
          <Box>
            <Skeleton sx={{ width: 75, height: 20, marginBottom: 0.05 }} />
            <Skeleton sx={{ width: 55, height: 20 }} />
          </Box>
        </Box>
        <Skeleton sx={{ height: 42, width: 67 }} />
      </Box>
    </Box>
  );
};

export default OrderSkeletonLoader;
