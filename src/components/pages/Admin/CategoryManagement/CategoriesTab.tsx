import Box from "@mui/material/Box";
import CustomTab from "src/components/shared/CustomTab/CustomTab";

const CategoriesTab = () => {
  const handleClick = (value: string) => {
    console.log(value);
  };
  return (
    <Box
      sx={{
        my: 1,
      }}
    >
      <Box sx={{ pl: 2, display: "flex", gap: 1, mb: 2 }}>
        <CustomTab
          handleClick={handleClick}
          value={"all"}
          title={"All Category"}
          active={true}
        />
      </Box>
    </Box>
  );
};

export default CategoriesTab;
