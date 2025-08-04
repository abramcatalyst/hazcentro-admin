import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { tabOptions } from "./HelpAndSupportWrapper";
import { useTheme } from "@mui/material/styles";

type Props = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
};
const HelpAndSupportTabs = ({ selectedTab, setSelectedTab }: Props) => {
  const theme = useTheme();
  const handleClick = (value: string) => {
    setSelectedTab(value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Grid container spacing={1}>
          {tabOptions.map((item) => {
            return (
              <Grid size={{ xs: 12, sm: 6, md: 5 }} key={item.value}>
                <Box
                  sx={{
                    background:
                      selectedTab === item.value
                        ? theme.palette.grey[200]
                        : theme.palette.grey[50],
                    border:
                      selectedTab === item.value
                        ? `2px solid ${theme.palette.primary.main}`
                        : "none",
                    py: 1.2,
                    px: 0.7,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: `all 0.2s ease-in`,
                    "&:hover": {
                      background: theme.palette.grey[200],
                    },
                  }}
                  onClick={() => {
                    handleClick(item?.value);
                  }}
                >
                  <Box>
                    <Typography sx={{ mt: 0.3, mb: 0.7, fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography sx={{ fontSize: "12px" }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Box></Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default HelpAndSupportTabs;
