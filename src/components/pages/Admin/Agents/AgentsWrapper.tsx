import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { GLOBAL_COLORS } from "src/utils";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import AgentsTab from "./AgentsTab";
import AgentsTable from "./AgentsTable";
import AddAgentDialog from "./AddAgentDialog";

const AgentsWrapper = () => {
  const [openAddAgentDialog, setOpenAddAgentDialog] = useState(false);

  const handleCloseAddAgentDialog = () => {
    setOpenAddAgentDialog(false);
  };
  const handleOpenAddAgentDialog = () => {
    setOpenAddAgentDialog(true);
  };
  return (
    <Box>
      {openAddAgentDialog && (
        <AddAgentDialog
          open={openAddAgentDialog}
          handleClose={handleCloseAddAgentDialog}
        />
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <AppHeader text="Agents" />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button
            color="secondary"
            size="large"
            variant="outlined"
            sx={{
              borderRadius: "12px",
              MozOutlineRadius: "12px",
              border: `2px solid ${GLOBAL_COLORS.SECONDARY_MAIN}`,
            }}
            onClick={() => {
              handleOpenAddAgentDialog();
            }}
          >
            Add Agent
          </Button>
          <Button
            size="large"
            color="inherit"
            sx={{
              borderRadius: "12px",
              MozOutlineRadius: "12px",
              background: `${GLOBAL_COLORS.GREY_50}`,
              px: 2,
            }}
          >
            Manage
          </Button>
          {/* {usersViewTabOptions.map((item) => (
            <Box
              sx={{
                height: "42px",
                minWidth: "88px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                background:
                  item.value === view ? "#47B48E0D" : GLOBAL_COLORS.GREY_10,
                color: item.value === view ? "#47B48E" : "GrayText",
                borderRadius: "12px",
                border: item.value === view ? `2px solid #47B48E` : "none",
                cursor: "pointer",
              }}
              key={item.title}
              onClick={() => {
                setView(item.value);
              }}
            >
              <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                Add Agent
              </Typography>
            </Box>
          ))} */}
        </Box>
      </Box>
      <AgentsTab />
      <AgentsTable />
    </Box>
  );
};

export default AgentsWrapper;
