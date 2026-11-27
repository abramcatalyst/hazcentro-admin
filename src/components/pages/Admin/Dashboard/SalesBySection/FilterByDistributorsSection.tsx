import Box from "@mui/material/Box";
import { SalesInsightVendorType } from "src/types/admin";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { SalesByCard } from "./SalesBySectionWrapper";

type Props = {
  data: SalesInsightVendorType[];
};

const FilterByDistributorsSection = ({ data }: Props) => {
  return (
    <Box my={1}>
      {data?.length > 0 ? (
        data.map((item, idx) => (
          <SalesByCard
            num={idx}
            key={item.vendor_id}
            title={item.name}
            subTitle={`User ID: ${item.unique_user_id ?? "N/A"}`}
          />
        ))
      ) : (
        <EmptyTable subText="No distributor sales data yet" />
      )}
    </Box>
  );
};

export default FilterByDistributorsSection;
