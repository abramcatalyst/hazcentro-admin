import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { currencyFormater } from "src/utils";
import { VendorProductCategoryType } from "src/types/categories";
import Logo from "src/assets/images/logo.png";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";

type CategoryCardProps = {
  data: VendorProductCategoryType;
};

const sizing = { xs: 12, sm: 6, md: 4 };
const CategoryCard = ({ data }: CategoryCardProps) => {
  return (
    <Box
      sx={{
        // background:  "#FBE6C433" : "#F7F7FB",
        background: "#F7F7FB",
        borderRadius: "12px",
        py: 0.3,
        minHeight: "75px",
      }}
    >
      <Box
        sx={{
          pb: 1,
          px: 1,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderRadius: "12px",
        }}
      >
        <Box>
          <img
            src={data?.category_icon || Logo}
            alt={data?.name}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box sx={{ width: "100%" }}>
          <Typography
            noWrap
            sx={{
              fontWeight: 600,
              mb: 0.4,
              fontSize: { xs: "16px", sm: "20px" },
            }}
          >
            {currencyFormater(data?.total_products)}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1,
              my: 0.4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ fontSize: "13px" }}>{data?.name}</Typography>
            <Typography sx={{ fontSize: "13px", color: "#000000" }}>
              {data?.change_percent}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

type Props = {
  data: VendorProductCategoryType[];
};
const VendorsCategoriesTable = ({ data }: Props) => {
  return (
    <Box sx={{ background: "#ffffff", my: 1.5, p: 1 }}>
      {data && data?.length > 0 ? (
        <Grid container spacing={1}>
          {data.map((row) => (
            <Grid size={sizing}>
              <CategoryCard data={row} key={row?.id} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyTable subText="No Categories Available" />
      )}
    </Box>
  );
};

export default VendorsCategoriesTable;
