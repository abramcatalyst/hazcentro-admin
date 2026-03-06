import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import PlaceholderImg from "src/assets/images/placeholder.png";
import ProfileTitle from "src/components/shared/ProfileTitle/ProfileTitle";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { TANSTACK_REQUEST_CACHE_TAGS } from "src/utils/queryTags";
import { fetchWorkerJobRequestData } from "src/services/users";
import HalfScreenLoader from "src/components/shared/HalfScreenLoader/HalfScreenLoader";
import HalfScreenError from "src/components/shared/HalfScreenError/HalfScreenError";
import {
  formatErrorMessage,
  rowsPerPageOptions,
  sLimit,
  sPage,
} from "src/utils";
import EmptyTable from "src/components/shared/EmptyTable/EmptyTable";
import { JobRequestType } from "src/types/workers";
import { ChangeEvent } from "react";

type RequestInfoBoxProps = {
  info: JobRequestType;
  direction?: "row" | "column";
};
const RequestInfoBox = ({ info, direction = "row" }: RequestInfoBoxProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: direction,
        gap: direction === "column" ? "2px" : 1,
        alignItems: direction === "column" ? "flex-start" : "center",
      }}
    >
      <Box>
        <img
          src={info?.user?.profile_picture_url ?? PlaceholderImg}
          alt="product"
          style={{
            width: direction === "column" ? "40px" : "50px",
            height: direction === "column" ? "40px" : "50px",
            objectFit: "cover",
            borderRadius: "50%",
            marginTop: "2px",
          }}
        />
      </Box>
      <Box sx={{ maxWidth: "500px" }}>
        <Typography
          sx={{
            fontWeight: 500,
            fontSize: "15px",
          }}
        >
          {info?.user?.name}
        </Typography>
        <Typography
          sx={{
            color: "GrayText",
            fontSize: "11.5px",
            display: "-webkit-box",
            textOverflow: "ellipsis",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,

            overflow: "hidden",
          }}
        >
          {info?.description}
        </Typography>
      </Box>
    </Box>
  );
};

type StatusBoxProps = {
  status: string;
};
const StatusBox = ({ status }: StatusBoxProps) => {
  return (
    <Box
      sx={{
        background: "#ffffff",
        borderRadius: "25px",
        py: 0.4,
        px: 0.9,
        width: "112px",
      }}
    >
      <Typography
        sx={{
          fontSize: "13px",
          color: status ? "#01AA89" : "#EE1616",
          textAlign: "center",
        }}
      >
        {status}
      </Typography>
    </Box>
  );
};
const SavedWorkersSection = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    limit: rowsPerPageOptions[0].toString(),
    page: "1",
  });
  const limit = Number(searchParams.get(sLimit)) || rowsPerPageOptions[0];
  const page = Number(searchParams.get(sPage)) || 1;

  const { error, data, isError, isPending } = useQuery({
    queryKey: [
      TANSTACK_REQUEST_CACHE_TAGS.FETCH_SINGLE_WORKER_JOB_REQUESTS,
      { id, page, limit },
    ],
    queryFn: () => fetchWorkerJobRequestData({ id: id, page, limit }),
  });

  const handleChangePage = (_event: unknown, newPage: number) => {
    setSearchParams(
      (params) => {
        params.set(sPage, `${newPage + 1}`);
        return params;
      },
      { replace: true },
    );
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      (params) => {
        params.set(sLimit, event.target.value.toString());
        params.set(sPage, "1");
        return params;
      },
      { replace: true },
    );
  };

  if (isPending) {
    return <HalfScreenLoader />;
  }

  if (isError) {
    return <HalfScreenError text={formatErrorMessage(error)} />;
  }

  return (
    <>
      <Box
        component={Paper}
        sx={{
          p: 1,
          mb: 1,
          width: "100%",
        }}
        elevation={0}
      >
        <Box sx={{ my: 1 }}>
          <ProfileTitle text="Requests" />
        </Box>

        {data?.meta?.total > 0 ? (
          <Box>
            {data?.data.map((item) => (
              <Box
                key={item?.id}
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: { xs: "column", md: "row" },
                  background: "#F7F7F980",
                  py: 2,
                  px: 1,
                  borderRadius: "20px",
                  mb: 1,
                }}
              >
                <RequestInfoBox info={item} />

                <StatusBox status={item?.status} />
              </Box>
            ))}{" "}
          </Box>
        ) : (
          <EmptyTable subText="No request found" />
        )}
      </Box>
      <Box sx={{ my: 1 }}>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data?.meta?.total || 0}
          rowsPerPage={limit || rowsPerPageOptions[0]}
          page={page - 1}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default SavedWorkersSection;
