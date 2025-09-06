import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const TableSkeletonLoader = () => {
  return (
    <Box>
      <Skeleton sx={{ height: 44, my: 0.2 }} />
      <Skeleton sx={{ height: 44, my: 0.2 }} />
      <Skeleton sx={{ height: 44, my: 0.2 }} />
      <Skeleton sx={{ height: 44, my: 0.2 }} />
    </Box>
  );
};

export default TableSkeletonLoader;
