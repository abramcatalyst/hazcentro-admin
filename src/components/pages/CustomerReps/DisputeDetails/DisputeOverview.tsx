import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import {
  baseUrl,
  formatErrorMessage,
  GLOBAL_COLORS,
  isAuthTokenExpired,
  setDefaultHeaders,
} from "src/utils";
import dayjs from "dayjs";
import CustomTab from "src/components/shared/CustomTab/CustomTab";
import { SingleDisputeType } from "src/types/disputes";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import toast from "react-hot-toast";

type ItemBoxProps = {
  title: string;
  value: string;
  applyColor?: boolean;
};
const DisputeInfoBox = ({ title, value, applyColor }: ItemBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 0.7,
        alignItems: "center",
        fontSize: "12.5px",
        my: 0.5,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: applyColor ? GLOBAL_COLORS.GREEN_MAIN : "GrayText",
          display: "-webkit-box",
          textOverflow: "ellipsis",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,

          overflow: "hidden",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

type Props = {
  data: SingleDisputeType;
};
const DisputeOverview = ({ data }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const handleClick = () => {};
  const handleSubmitResolve = async () => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        status: "resolved",
      };
      await axios.patch(`${baseUrl}/agents/disputes/${id}/status`, payload);

      toast.success("Dispute resolved successfully");

      await queryClient.invalidateQueries({
        queryKey: [
          TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_CUSTOMER_CARE_DISPUTE,
        ],
      });
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      sx={{
        mb: 1,
        p: { xs: 1, sm: 2 },
        borderRadius: "20px",
        background: "#ffffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <ProfileTitle text="Dispute Overview" />
      </Box>
      <Box>
        <DisputeInfoBox title="Dispute ID:" value={data?.id} />
        <DisputeInfoBox
          title="Date & Time:"
          value={dayjs(data?.created_at).format("MMM DD, YYYY, HH:MMA")}
        />
        <DisputeInfoBox title="Dispute Status:" value={data?.status} />
        <DisputeInfoBox title="Case Title:" value={data?.type} />
      </Box>
      <Box sx={{ mt: 3, mb: 1.5 }}>
        <Box sx={{ maxWidth: "100px", mb: 1 }}>
          <CustomTab
            handleClick={handleClick}
            value={"details"}
            title={"Details"}
            active={true}
          />
        </Box>
        <DisputeInfoBox title="Summary of Dispute:" value={data?.message} />

        <DisputeInfoBox title="Item Name:" value={data?.product?.name} />
        <DisputeInfoBox title="Quantity:" value="1" />
        <DisputeInfoBox title="Reported Issues:" value="Damaged Item" />
      </Box>
      <Divider />
      <Box sx={{ mt: 3, mb: 2 }}>
        <DisputeInfoBox title="Buyer:" value="John Doe" />

        <DisputeInfoBox
          title="Buyer Phone Number:"
          value="23487945678"
          applyColor
        />
        <DisputeInfoBox title="Merchant:" value={data?.product?.vendor?.name} />
        <DisputeInfoBox
          title="Merchant Phone Number:"
          value="23487945678"
          applyColor
        />
      </Box>
      {data?.status === "resolved" ? null : (
        <Box>
          <Button
            size="small"
            variant="contained"
            disabled={isSubmitting}
            onClick={() => {
              handleSubmitResolve();
            }}
          >
            {isSubmitting ? "Submitting" : "Mark Resolved"}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default DisputeOverview;
