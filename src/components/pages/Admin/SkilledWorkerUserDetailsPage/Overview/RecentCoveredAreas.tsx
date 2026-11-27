import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import { statesColoursList } from "src/utils";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";

type Props = {
  areas?: string[];
};

/**
 * Display recent geographic areas covered by a skilled worker.
 */
const RecentCoveredAreas = ({ areas = [] }: Props) => {
  return (
    <Box
      component={Paper}
      sx={{ p: 1, borderRadius: "12px", mb: 2, pb: 4 }}
      elevation={0}
    >
      <Box sx={{ mb: 2, pl: 1.5 }}>
        <ProfileTitle text="Recent Covered Areas" />
      </Box>
      {areas.length === 0 ? (
        <Box sx={{ px: 1.5 }}>
          <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
            No covered areas yet from accepted or completed job requests.
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 0.5,
            alignItems: "center",
            flexWrap: "wrap",
            mt: 2,
            px: 1.5,
          }}
        >
          {areas.map((item, index) => {
            const color =
              statesColoursList[index % statesColoursList.length];

            return (
              <Box
                key={item}
                sx={{
                  background: alpha(color, 0.1),
                  px: 1,
                  py: 0.2,
                  borderRadius: "25px",
                }}
              >
                <Typography
                  sx={{
                    color,
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {item}
                </Typography>
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default RecentCoveredAreas;
