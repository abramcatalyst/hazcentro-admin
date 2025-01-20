import { RiHomeFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { PiGraduationCapFill, PiNotebook, PiUser } from "react-icons/pi";
import { TbTie } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import { NavigationType } from "src/utils/types";
import { ADMIN_ROUTE_LINKS } from "src/utils/routeLinks";

const navigation: NavigationType[] = [
  {
    id: 0,
    kind: "header",
    title: "Menu",
    permission: "",
  },
  {
    id: 1,
    kind: "page",
    title: "Overview",
    url: ADMIN_ROUTE_LINKS.ADMIN_OVERVIEW,
    icon: <RiHomeFill />,
    permission: "",
  },

  {
    id: 2,
    kind: "page",
    title: "User Management",
    url: ADMIN_ROUTE_LINKS.ADMIN_USER_MANAGEMENT,
    icon: <FaUsers />,
    permission: "",
  },
  {
    id: 3,
    kind: "page",
    title: "Category Management",
    url: ADMIN_ROUTE_LINKS.ADMIN_CATEGORY_MANAGEMENT,
    icon: <PiGraduationCapFill />,
    permission: "",
  },

  {
    id: 4,
    kind: "page",
    title: "Order Management",
    url: ADMIN_ROUTE_LINKS.ADMIN_ORDER_MANGEMENT,
    icon: <TbTie />,
    permission: "",
    invertIcon: true,
  },
  {
    id: 5,
    kind: "page",
    icon: <PiNotebook />,
    title: "Escrow Dashboard",
    url: ADMIN_ROUTE_LINKS.ADMIN_ESCROW_DASHBOARD,
    permission: "",
  },
  {
    id: 6,
    kind: "page",
    icon: <PiNotebook />,
    title: "Agent",
    url: ADMIN_ROUTE_LINKS.ADMIN_AGENT,
    permission: "",
  },
  {
    id: 7,
    kind: "page",
    icon: <PiNotebook />,
    title: "Messages",
    url: ADMIN_ROUTE_LINKS.ADMIN_MESSAGES,
    permission: "",
  },
  {
    id: 8,
    kind: "gap",
    permission: "",
  },

  {
    id: 9,
    kind: "header",
    title: "Settings",
    permission: "",
  },
  {
    id: 10,
    kind: "page",
    icon: <HiOutlineRectangleStack />,
    title: "Settings",
    url: ADMIN_ROUTE_LINKS.ADMIN_SETTINGS,
    permission: "",
  },
  {
    id: 11,
    kind: "page",
    icon: <HiOutlineLightBulb />,
    title: "Help & Support",
    url: ADMIN_ROUTE_LINKS.ADMIN_HELP_AND_SUPPORT,
    permission: "",
  },
  {
    id: 12,
    kind: "page",
    icon: <PiUser />,
    title: "Account",
    url: ADMIN_ROUTE_LINKS.ADMIN_ACCOUNT,
    permission: "",
  },
];

export default navigation;
