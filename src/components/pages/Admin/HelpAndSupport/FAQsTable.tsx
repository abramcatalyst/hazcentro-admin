import { memo, useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { useQuery } from "@tanstack/react-query";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { fetchFAQs } from "src/services/faqs";
import { FAQType } from "src/types/faqs";
import { tableMenuStyles } from "src/utils";
import EditFAQDialog from "./EditFAQDialog";
import AddFAQsDialog from "./AddFAQsDialog";

const faqs = [
  {
    id: 1,
    title: "What payment methods do you accept?",
    content:
      "We accept Visa, MasterCard, American Express, PayPal, Apple Pay, and Google Pay. All transactions are secured with SSL encryption.",
  },
  {
    id: 2,
    title: "How long does shipping take?",
    content:
      "Standard shipping typically takes 5–7 business days. Expedited options (2–3 business days) and overnight shipping are also available at checkout.",
  },
  {
    id: 3,
    title: "What is your return policy?",
    content:
      "You can return most items within 30 days of delivery for a full refund. Items must be in original condition and packaging. See our Returns page for full details.",
  },
  {
    id: 4,
    title: "How can I track my order?",
    content:
      "Once your order ships, you’ll receive an email with a tracking number and link. You can also log in to your account and view ‘Order History’ to see real-time updates.",
  },
  {
    id: 5,
    title: "Do you ship internationally?",
    content:
      "Yes, we ship to select countries worldwide. International shipping rates and delivery times vary by destination—please check our Shipping Info page for details.",
  },
];

const FAQsTable = () => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddFAQs, setOpenAddFAQs] = useState(false);
  const [selected, setSelected] = useState<FAQType | null>(null);
  const handleOpenEdit = (item: FAQType) => {
    setSelected(item);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelected(null);
  };
  const handleOpenAddFAQ = () => {
    setOpenAddFAQs(true);
  };
  const handleCloseAddFAQ = () => {
    setOpenAddFAQs(false);
  };
  const { data } = useQuery({
    queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FAQS, {}],
    queryFn: () => fetchFAQs({}),
  });

  console.log("bbbbbbbbbbbbbbb", data);
  return (
    <Box sx={{ background: "#ffffff", p: 1, borderRadius: "20px", mb: 1 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mt: 1,
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 600 }} variant="h6">
          Frequently Asked Questions
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            handleOpenAddFAQ();
          }}
        >
          Add New FAQ
        </Button>
      </Box>
      {openEdit && selected && (
        <EditFAQDialog
          open={openEdit}
          selected={selected}
          handleClose={handleCloseEdit}
        />
      )}
      {openAddFAQs && (
        <AddFAQsDialog open={openAddFAQs} handleClose={handleCloseAddFAQ} />
      )}
      <Box>
        {data?.data?.length === 0 ? (
          <EmptyTable subText="No FAQs found" />
        ) : (
          <Box>
            {faqs?.map((row) => {
              return (
                <Accordion key={row?.id}>
                  <AccordionSummary>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        gap: 1,
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography component="span">{row?.title}</Typography>
                      <Box>
                        <IconButton>
                          <ExpandMoreIcon />
                        </IconButton>
                        <PopupState variant="popover">
                          {(popupState) => (
                            <Fragment>
                              <IconButton {...bindTrigger(popupState)}>
                                <MoreHorizRoundedIcon />
                              </IconButton>
                              <Menu {...bindMenu(popupState)}>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenEdit(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() => {
                                    handleOpenEdit(row);
                                    popupState.close();
                                  }}
                                  sx={tableMenuStyles}
                                >
                                  Delete
                                </MenuItem>
                              </Menu>
                            </Fragment>
                          )}
                        </PopupState>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>{row?.content}</AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        )}
      </Box>
      <Box sx={{ my: 1 }}></Box>
    </Box>
  );
};

export default memo(FAQsTable);
