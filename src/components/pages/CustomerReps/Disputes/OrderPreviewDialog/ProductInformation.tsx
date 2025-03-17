import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { GLOBAL_COLORS } from "src/utils";

const optionsObj = {
  OVERVIEW: "Overview",
  DESCRIPTION: "Description",
  WARRANTY: "Warranty",
  REVIEWS: "Reviews",
};
const options = [
  optionsObj.OVERVIEW,
  optionsObj.DESCRIPTION,
  optionsObj.WARRANTY,
  optionsObj.REVIEWS,
];
function ProductInformation() {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <Box
      sx={{
        my: 1,
        background: GLOBAL_COLORS.GREY_50,
        p: { xs: 1, sm: 1 },
        borderRadius: "16px",
      }}
    >
      <Box
        sx={{
          my: 1,
          background: "#F1F1F1",
          maxWidth: "381px",
          display: "flex",
          alignItems: "center",
          gap: 0.7,
        }}
      >
        {options.map((item) => {
          return (
            <Box
              key={item}
              sx={{
                borderRadius: "6px",
                py: 0.5,
                width: { xs: "100%", sm: "100px" },
                height: "33px",
                background: selectedOption === item ? "#DDDDDD" : "#F8F8F9",
                cursor: "pointer",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setSelectedOption(item);
              }}
            >
              <Typography variant="body2">{item}</Typography>
            </Box>
          );
        })}
      </Box>
      <Box>
        {selectedOption === optionsObj.OVERVIEW && (
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam
            expedita possimus reiciendis impedit necessitatibus provident earum
            debitis in? Provident corrupti quasi necessitatibus minus fuga
            explicabo asperiores molestiae delectus quo!
          </Typography>
        )}
        {selectedOption === optionsObj.DESCRIPTION && (
          <Typography>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam
            expedita possimus reiciendis impedit necessitatibus provident earum
            debitis in? Provident corrupti quasi necessitatibus minus fuga
            explicabo asperiores molestiae delectus quo! expedita possimus
            reiciendis impedit necessitatibus provident earum debitis in?
            Provident corrupti quasi necessitatibus minus fuga explicabo
            asperiores molestiae delectus quo!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
export default ProductInformation;
