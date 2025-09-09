import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import User from "src/assets/images/avatar-male.png";

import OrderPreviewDialog from "./OrderPreviewDialog/OrderPreviewDialog";
import { useTheme } from "@mui/material/styles";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchCustomerCareDisputes } from "src/services/agents";
import TableSkeletonLoader from "src/components/shared/TableSkeletonLoader/TableSkeletonLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import renderStatus from "src/components/shared/RenderStatus/renderStatus";
// import UserProfileDialog from "../UserProfileDialog/UserProfileDialog";
// import DistributorProfileDialog from "../DistributorProfileDialog/DistributorProfileDialog";
dayjs.extend(advancedFormat);

type Props = {
  selectedTab: string;
};
function DisputesTable({ selectedTab }: Props) {
  const [openPreview, setOpenPreview] = useState(false);

  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;

  const { isPending, error, data, isError } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_CUSTOMER_CARE_DISPUTES,
      { limit, page, selectedTab },
    ],
    queryFn: () =>
      fetchCustomerCareDisputes({ limit: limit, page, status: selectedTab }),
  });
  const handleOpenPreview = () => {
    setOpenPreview(true);
  };
  const handleClosePreviewProfile = () => {
    setOpenPreview(false);
  };
  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true }
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true }
    );
  };

  console.log(handleOpenPreview);

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  if (isPending) {
    return <TableSkeletonLoader />;
  }
  return (
    <Box sx={{ width: "100%", my: 1 }}>
      {openPreview && (
        <OrderPreviewDialog
          open={openPreview}
          handleClose={handleClosePreviewProfile}
        />
      )}

      <Box sx={{ minHeight: "50vh" }}>
        {data && data?.total > 0 ? (
          <Box>
            {data?.data?.map((row) => {
              return (
                <Box
                  key={row?.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    background: "#ffffff",
                    px: 1,
                    py: 0.6,
                    borderRadius: "8px",
                    gap: { xs: 1, sm: 1.5 },
                    my: 0.9,
                  }}
                >
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Box
                      sx={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(
                          `${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/${row?.id}`
                        );
                      }}
                    >
                      <img
                        src={
                          row?.user?.profile_picture_url &&
                          typeof row?.user?.profile_picture_url === "string"
                            ? row?.user?.profile_picture_url
                            : User
                        }
                        alt="user"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box>
                      <Box
                        sx={{ display: "flex", gap: 0.6, alignItems: "center" }}
                      >
                        <Link
                          to={`${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/${row?.id}`}
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          <Typography
                            sx={{ fontWeight: 600, cursor: "pointer" }}
                          >
                            {row?.user?.name}
                          </Typography>
                        </Link>

                        <Typography
                          sx={{
                            pl: 0.5,
                            color: theme.palette.secondary.main,
                            fontSize: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {row?.user?.role}
                        </Typography>
                      </Box>
                      <Link
                        to={`${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/${row?.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography sx={{ fontSize: "13.1px" }} noWrap>
                          {row?.message}
                        </Typography>
                      </Link>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      minWidth: "140px",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.3,
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {dayjs(row?.created_at).format("MMM Do YYYY")}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate(
                          `${CUSTOMER_ROUTE_LINKS.CUSTOMER_SINGLE_DISPUTE}/${row?.id}`
                        );
                      }}
                    >
                      <Typography sx={{ fontSize: "12.4px" }}>
                        Status:
                      </Typography>
                      {renderStatus(row?.status)}
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        ) : (
          <EmptyTable subText="No disputes found" />
        )}
      </Box>
      <Box sx={{ my: 1 }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data?.total || 0}
          rowsPerPage={limit || rowsPerPageOptions[0]}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
}

export default DisputesTable;
