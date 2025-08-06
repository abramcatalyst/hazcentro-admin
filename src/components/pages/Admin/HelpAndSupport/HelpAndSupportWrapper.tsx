import { useState } from "react";
import Box from "@mui/material/Box";
import AppHeader from "src/components/shared/AppHeader/AppHeader";
import HelpAndSupportTabs from "./HelpAndSupportTabs";
import FAQsTable from "./FAQsTable";
import ReturnPolicyWrapper from "./ReturnPolicyWrapper";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "src/components/shared/ErrorFallback/ErrorFallback";

export const tabOptionsObj = {
  FAQS: "FAQS",
  RETURN_POLICY: "RETURN_POLICY",
};

export const tabOptions = [
  {
    title: "Frequently Asked Questions",
    value: tabOptionsObj.FAQS,
    description:
      "Enable Access to frequently asked questions and documentation.",
  },
  {
    title: "Return & Refund Policies",
    value: tabOptionsObj.RETURN_POLICY,
    description: `Return & Refund Policies
Configure return and refund processing rules.`,
  },
];

const HelpAndSupportWrapper = () => {
  const [selectedTab, setSelectedTab] = useState(tabOptions[0].value);

  return (
    <Box>
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
        <AppHeader text="Help & Support" />
      </Box>
      <Box>
        <HelpAndSupportTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </Box>
      <Box>{selectedTab === tabOptionsObj.FAQS && <FAQsTable />}</Box>
      <ErrorBoundary FallbackComponent={ErrorFallBack}>
        <Box>
          {selectedTab === tabOptionsObj.RETURN_POLICY && (
            <ReturnPolicyWrapper />
          )}
        </Box>
      </ErrorBoundary>
    </Box>
  );
};

export default HelpAndSupportWrapper;
