import { useEffect } from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
  useLocation,
  Outlet,
} from "react-router-dom";
import theme from "./theme/theme";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import {
  ADMIN_ROUTE_LINKS,
  ADMIN_ROUTE_SUB_LINKS,
  CUSTOMER_ROUTE_SUB_LINKS,
  GLOBAL_ROUTE_LINKS,
} from "./utils/routeLinks";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import SuperAdminLayout from "./components/layouts/SuperAdminLayout/SuperAdminLayout";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminEscrowDashboard from "./pages/admin/AdminEscrowDashboard";
import AdminAgents from "./pages/admin/AdminAgents";
import AdminHelpAndSupport from "./pages/admin/AdminHelpAndSupport";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminAccount from "./pages/admin/AdminAccount";
import AdminAgentProfile from "./pages/admin/AdminAgentProfile";
import AdminSingleCategoryPage from "./pages/admin/AdminSingleCategoryPage";
import Login from "./pages/Login";
import AdminUserDetailsPage from "./pages/admin/AdminUserDetailsPage";
import CustomerCareLayout from "./components/layouts/CustomerCareLayout/CustomerCareLayout";
import NotFoundPage from "./pages/NotFoundPage";
import CustomerOverview from "./pages/customercare/CustomerOverview";
import Disputes from "./pages/customercare/Disputes";
import CustomerDisputeDetails from "./pages/customercare/DisputeDetails";
import Distributors from "./pages/customercare/Distributors";
import DistributorDetails from "./pages/customercare/DistributorDetails";
import CustomerCareOrders from "./pages/customercare/CustomerCareOrders";
import CustomerCareProfile from "./pages/customercare/CustomerCareProfile";

function App() {
  const CustomerCareRoutes = () => (
    <Routes>
      <Route element={<CustomerCareLayout />}>
        <Route
          path={`${CUSTOMER_ROUTE_SUB_LINKS.SINGLE_DISPUTE}/:id`}
          element={<CustomerDisputeDetails />}
        />
        <Route
          path={`${CUSTOMER_ROUTE_SUB_LINKS.SINGLE_DISTRIBUTOR}/:id`}
          element={<DistributorDetails />}
        />

        <Route
          path={CUSTOMER_ROUTE_SUB_LINKS.OVERVIEW}
          element={<CustomerOverview />}
        />
        <Route
          path={CUSTOMER_ROUTE_SUB_LINKS.DISPUTES}
          element={<Disputes />}
        />
        <Route
          path={CUSTOMER_ROUTE_SUB_LINKS.DISTRIBUTORS}
          element={<Distributors />}
        />
        <Route
          path={CUSTOMER_ROUTE_SUB_LINKS.ORDERS}
          element={<CustomerCareOrders />}
        />
        <Route
          path={CUSTOMER_ROUTE_SUB_LINKS.PROFILE}
          element={<CustomerCareProfile />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );

  const AdminRoutes = () => (
    <Routes>
      <Route element={<SuperAdminLayout />}>
        <Route
          path={`${ADMIN_ROUTE_SUB_LINKS.SINGLE_CATEGORY_PAGE}/:id`}
          element={<AdminSingleCategoryPage />}
        />
        <Route
          path={`${ADMIN_ROUTE_SUB_LINKS.USER_PROFILE}/:id`}
          element={<AdminUserDetailsPage />}
        />

        <Route
          path={`${ADMIN_ROUTE_SUB_LINKS.AGENT_PROFILE}/:id`}
          element={<AdminAgentProfile />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.OVERVIEW}
          element={<AdminOverview />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.USER_MANAGEMENT}
          element={<AdminUserManagement />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.CATEGORY_MANAGEMENT}
          element={<AdminCategories />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.ORDER_MANGEMENT}
          element={<AdminOrders />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.ESCROW_DASHBOARD}
          element={<AdminEscrowDashboard />}
        />
        <Route path={ADMIN_ROUTE_SUB_LINKS.AGENT} element={<AdminAgents />} />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.HELP_AND_SUPPORT}
          element={<AdminHelpAndSupport />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.MESSAGES}
          element={<AdminMessages />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.SETTINGS}
          element={<AdminSettings />}
        />
        <Route
          path={ADMIN_ROUTE_SUB_LINKS.ACCOUNT}
          element={<AdminAccount />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />} />
              <Route path="admin/*" element={<AdminRoutes />} />
              <Route path="customer-care/*" element={<CustomerCareRoutes />} />

              <Route path={GLOBAL_ROUTE_LINKS.LOGIN} element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />
              {/* <Route path="dashboard" element={<Dashboard />}>
      
        <Route path="project/:id" element={<Project />} />
      </Route> */}
            </Routes>
          </BrowserRouter>
        </>
      </ThemeProvider>
    </>
  );
}

const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate(ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW);
    }
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};
export default App;
