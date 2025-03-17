import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ProfileInfoBox from "src/components/shared/ProfileInfoBox/ProfileInfoBox";

const sizing = { xs: 12, sm: 6, md: 4, lg: 3 };
const ProductInfo = () => {
  return (
    <Box my={2}>
      <Grid container spacing={1}>
        <Grid size={sizing}>
          <ProfileInfoBox title="Product Type" value="Accesories" />
        </Grid>

        <Grid size={sizing}>
          <ProfileInfoBox title="Region/Territory" value="Niger Republic" />
        </Grid>
        <Grid size={sizing}>
          <ProfileInfoBox title="Location" value="Delta" />
        </Grid>
      </Grid>
      <Box sx={{ my: 1 }}>
        <Typography sx={{ fontSize: "13px", color: "GrayText" }}>
          Description
        </Typography>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
          ullam obcaecati iure eius, dolore quibusdam nisi saepe cupiditate
          dignissimos, vero commodi doloribus sit natus iste hic veritatis,
          blanditiis autem laudantium?
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductInfo;
