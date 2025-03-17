import { RiHomeFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { PiGraduationCapFill, PiUser } from "react-icons/pi";
import { TfiMicrophone } from "react-icons/tfi";
import { LuPiggyBank } from "react-icons/lu";
import { NavigationType } from "src/utils/types";
import { CUSTOMER_ROUTE_LINKS } from "src/utils/routeLinks";
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
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_OVERVIEW,
    icon: <RiHomeFill />,
    permission: "",
  },

  {
    id: 2,
    kind: "page",
    title: "Orders",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_ORDER,
    icon: <FaUsers />,
    permission: "",
  },
  {
    id: 3,
    kind: "page",
    title: "Messages",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_MESSAGES,
    icon: <PiGraduationCapFill />,
    permission: "",
  },

  {
    id: 4,
    kind: "page",
    title: "Disputes",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_DISPUTES,
    icon: <PiGraduationCapFill />,
    permission: "",
    // invertIcon: true,
  },

  {
    id: 6,
    kind: "page",
    icon: <TfiMicrophone />,
    title: "Distributors",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_DISTRIBUTORS,
    permission: "",
  },
  {
    id: 7,
    kind: "page",
    icon: <LuPiggyBank />,
    title: "Skilled Workers",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_SKILLED_WORKERS,
    permission: "",
  },

  {
    id: 8,
    kind: "page",
    icon: <PiUser />,
    title: "Profile",
    url: CUSTOMER_ROUTE_LINKS.CUSTOMER_PROFILE,
    permission: "",
  },
];

export default navigation;
