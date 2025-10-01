import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import IconButton from "@mui/material/IconButton";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ChevronLeftSharpIcon from "@mui/icons-material/ChevronLeftSharp";
import MetaDecorator from "../MetaDecorator/MetaDecorator";

type Props = {
  text: string;
  isCapitalized?: boolean;
};
const AppHeader = ({ isCapitalized, text }: Props) => {
  const [isNestedRoute, setIsNestedRoute] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    let numberOfSlashes = pathname?.split("/")?.length;

    if (numberOfSlashes > 4) {
      setIsNestedRoute(true);
    }
    return () => {
      setIsNestedRoute(false);
    };
  }, [pathname]);

  const crumbs = pathname.split("/")?.filter((item) => item !== "");

  return (
    <Box
      sx={{
        mb: 1,
        display: "flex",
        gap: 1.2,
        alignItems: "center",
      }}
    >
      <MetaDecorator title={` ${text} `} />
      {isNestedRoute && (
        <IconButton onClick={() => navigate(-1)} size="small">
          <ChevronLeftSharpIcon />
        </IconButton>
      )}
      <Box>
        <Breadcrumbs aria-label="breadcrumb">
          {crumbs?.length > 1 &&
            crumbs.map((item) => (
              <Link
                key={item}
                to="#"
                style={{
                  fontSize: "13.3px",
                  textDecoration: "none",
                  color: "inherit",
                  textTransform: "capitalize",
                }}
              >
                {item}
              </Link>
            ))}
          {/* <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography> */}
        </Breadcrumbs>
        <Typography
          variant="h5"
          sx={{
            color: "#312F27B2",
            fontSize: { xs: "18px", sm: "20px" },
            textTransform: isCapitalized ? "capitalize" : "none",
            fontWeight: 700,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default AppHeader;
