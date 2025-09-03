import { ReactElement, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { StepIconProps } from "@mui/material/StepIcon";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BiBadgeCheck } from "react-icons/bi";
import { TbBus } from "react-icons/tb";
import { LuPackageCheck } from "react-icons/lu";
import { PiHandCoins } from "react-icons/pi";
import { OrderType } from "src/types/orders";
import axios from "axios";
import {
  baseUrl,
  formatErrorMessage,
  formatSuccessMessage,
  isAuthTokenExpired,
  renderOrderStatus,
  setDefaultHeaders,
} from "src/utils";
import toast from "react-hot-toast";
import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled("div")<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme }) => ({
  backgroundColor: "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    // {
    //   props: ({ ownerState }) => ownerState.active,
    //   style: {
    //     backgroundImage:
    //       "linear-gradient( 136deg, rgb(255, 184, 62) 0%, rgb(255, 156, 43) 50%, rgb(255, 156, 43) 100%)",
    //   },
    // },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(255, 184, 62) 0%, rgb(255, 156, 43) 50%, rgb(255, 156, 43) 100%)",
      },
    },
  ],
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: ReactElement<unknown> } = {
    1: <HiOutlineShoppingBag />,
    2: <BiBadgeCheck />,
    3: <TbBus />,
    4: <LuPackageCheck />,
    5: <PiHandCoins />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = [
  "Order Placed",
  "Confirmed",
  "In-transit",
  "Ready for Pickup",
  "Order Delivered",
];

type Props = {
  selectedOrder: OrderType;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<OrderType, Error>>;
};
const OrderStages = ({ selectedOrder, refetch }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (selectedOrder?.order_delivery?.status === "order-placed") {
      setActiveStep(1);
    }
    if (selectedOrder?.order_delivery?.status === "order-confirmed") {
      setActiveStep(2);
    }
    if (selectedOrder?.order_delivery?.status === "in-transit") {
      setActiveStep(3);
    }
    if (selectedOrder?.order_delivery?.status === "pickup-ready") {
      setActiveStep(4);
    }
    if (selectedOrder?.order_delivery?.status === "order-delivered") {
      setActiveStep(5);
    }
  }, [selectedOrder]);

  const handleSubmitUpdateStatus = async (index: number) => {
    try {
      setDefaultHeaders();
      isAuthTokenExpired();
      setIsSubmitting(true);

      const payload = {
        delivery_status: renderOrderStatus(index),
      };
      const res = await axios.patch(
        `${baseUrl}/agents/orders/${selectedOrder?.id}/delivery-status`,
        payload
      );
      const successMsg = formatSuccessMessage(res?.data);
      toast.success(successMsg);

      // setActiveStep(index + 1);
      await refetch();
      await queryClient.invalidateQueries({
        queryKey: [TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_ORDERS],
      });
    } catch (error) {
      const errorMsg = formatErrorMessage(error);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              //  StepIconComponent={ColorlibStepIcon}
              slots={{
                stepIcon: ColorlibStepIcon,
              }}
            >
              {label}
            </StepLabel>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Checkbox
                disabled={isSubmitting}
                size="small"
                checked={index + 1 <= activeStep}
                onChange={() => {
                  handleSubmitUpdateStatus(index + 1);
                }}
              />
            </Box>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default OrderStages;
