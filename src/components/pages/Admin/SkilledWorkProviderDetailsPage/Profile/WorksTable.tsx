import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"; // ES 2015

import Logo from "src/assets/tempimages/machine1.jpg";

dayjs.extend(relativeTime);

const headCells = [
  "Order ID",
  "Order Name",
  "Amount",
  "Date Created",
  "Buyer Name",
  "Merchant Name",
];

type WorkItemProps = {
  showUserImg: boolean;
};
const WorkItem = ({ showUserImg }: WorkItemProps) => {
  return (
    <Box
      sx={{
        my: 1,
        background: "#FCFCFD",
        p: 0.5,
        "&:hover": {
          background: "#47B48E0D",
        },
      }}
    >
      {showUserImg ? (
        <Box sx={{}}>
          <Box
            sx={{
              borderRadius: "8px",
              width: "152px",
              height: "155px",
            }}
          >
            <img
              src={Logo}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
                borderRadius: "8px",
              }}
              alt="logo"
            />
          </Box>
          <Box>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Work title
            </Typography>
            <Typography sx={{ color: "GrayText", fontSize: "12px" }}>
              {dayjs().fromNow()}
            </Typography>{" "}
          </Box>
        </Box>
      ) : null}
    </Box>
  );
};

function WorksTable() {
  return (
    <Box
      sx={{
        width: "100%",
        mb: 1,
        background: "#ffffff",
        py: { xs: 0.5, sm: 3 },
        px: { xs: 0.5, sm: 3 },
        borderRadius: "25px",
      }}
    >
      <Box>
        <Grid container spacing={1}>
          {headCells.map((row) => {
            return (
              <Grid key={row} size={{ xs: 6, sm: 4, md: 3 }}>
                <WorkItem showUserImg={true} />{" "}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default WorksTable;
