import { jwtDecode } from "jwt-decode";

import { IToken, TicketResultType } from "./types";
import axios from "axios";
import toast from "react-hot-toast";
import rolesPermissions, { adminRoles } from "./roles-permission";
import dayjs from "dayjs";
import { SxProps } from "@mui/material/styles";

// export const baseUrl = "https://reevaluateme.online/api";
export const baseUrl = "https://haz.reevaluateme.online/api/v1";
export const PERSIST_LOGIN = "PERSIST_LOGIN";
export const TOKEN_NAME = "HAZCENTRO_AUTH_TOKEN";
export const PROFILE_KEY = "H_PROFILE_KEY";
export const PREV_PATH = "prevPath";
export const rowsPerPageOptions = [20, 50, 100];
export const FULL_DATE_FORMAT = "MMM Do YYYY, HH:mm";

export const INDOOR_GAME = "indoor-game";
export const INDOOR_BET_OPTIONS = "indoor-game-bet-options";
export const INDOOR_RESULT_OPTIONS = "indoor-game-result-types";
export const INDOOR_OVER_OPTIONS = "indoor-game-over-bet-options";
export const INDOOR_UNDER_OPTIONS = "indoor-game-under-bet-options";
export const INDOOR_BOOSTER_OPTIONS = "indoor-game-booster-options";

export const sStatus = "status";
export const sSearch = "search";
export const sSearchId = "searchId";
export const sTransactionType = "transactionType";
export const sStartDate = "startDate";
export const sEndDate = "endDate";
export const sMinAmount = "minAmount";
export const sMaxAmount = "maxAmount";
export const sMinWonAmount = "minWonAmount";
export const sMaxWonAmount = "maxWonAmount";
export const sLimit = "limit";
export const sPage = "page";
export const sLastLoginDate = "lastLoginDate";
export const sUserName = "userName";
export const sCategory = "category";

export const FILTER_DATE_FORMAT = "DD/MM/YYYY";
export const FULL_TIME_FORMAT = "HH:mm:ss";
export const TIME_FORMAT = "HH:mm";

export const allTransactionTypes = {
  DEPOSIT: "deposit",
  CHARGE: "charge",
  WINNING: "winning",
  COMMISSION: "commission",
  WITHDRAWAL: "withdrawal",
};

export const tableMenuStyles = {
  display: "flex",
  margin: "3px 0px",
  fontSize: "13px",
};
export const modalTitleStyles = { textAlign: "center", fontWeight: 600 };

export const GLOBAL_COLORS = {
  PRIMARY_MAIN: "#FFCC16",
  PRIMARY_LIGHT: "#ffd644",
  PRIMARY_DARK: "#b28e0f",
  GREEN_MAIN: "#47B48E",
  GREY_10: "#FBFBFB",
  GREY_50: "#F7F7F8",
  GRAY_800: "#9D9D9D",
  GREEN_LIGHT: "#009A2C",
  CYAN_MAIN: "#47AAA7",
  CYAN_DARK: "#2e7f7d",
  YELLOW_500: "#FFCC16",
  SECONDARY_MAIN: "#47B48E",
  SECONDARY_DARK: "#317d63",
  SECONDARY_LIGHT: "#6bc3a4",
};

export const statesColoursList = [
  GLOBAL_COLORS.PRIMARY_MAIN,
  GLOBAL_COLORS.SECONDARY_MAIN,
  GLOBAL_COLORS.GREEN_MAIN,
  "#AD0000",
  "#003FAD",
];
export const linkStyle = {
  color: "inherit",
  textDecoration: "none",
};
export const SELECTED_PAGE_VIEW = "SELECTED_PAGE_VIEW";
export const setSelectedPageView = (val: string) => {
  sessionStorage.setItem(SELECTED_PAGE_VIEW, val);
};
export const getSelectedPageView = () => {
  return sessionStorage.getItem(SELECTED_PAGE_VIEW);
};
export const CATEGORY_TYPE = "categoryType";
export const SELECTED_CATEGORY_TYPES = {
  SUB_CATEGORY: "SUB_CATEGORY",
  CATEGORY: "CATEGORY",
};

export const listItemSelectStyles = {
  display: "flex",
  alignItems: "center",
  gap: "7px",
  fontSize: "14px",
  fontWeight: 400,
};

export const userRoles = {
  USER: "user",
  WORKER: "worker",
  VENDOR: "vendor",
  AGENT: "agent",
};

export const agentRolesObj = {
  CASHIER: "cashier",
  ORDINARY_AGENT: "ordinaryagent",
  SUPER_AGENT: "superagent",
  PRINCIPAL_AGENT: "principalagent",
};
export const INSTANT_METHOD = "instant";
export const BUNDLE_ID = "bundleId";
export const REPORT_DAY_FORMAT = "DD-MM-YYYY";
export const REPORT_MONTH_FORMAT = "MMM YYYY";
export const QUERY_DATE_FORMAT = "DD/MM/YYYY";
export const reportsDateFilterFormat = {
  DAILY: "DD-MM-YYYY",
  WEEKLY: "DD-MM-YYYY",
  MONTHLY: "MMM YYYY",
};
export const dialogButtonStyles: SxProps = { minWidth: "125px" };
export const reportsIntervals = {
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
};
export const ticketWalletType = {
  BONUS_WALLET: "bonusWallet",
  MAIN_WALLET: "mainWallet",
};
export const bonusType = {
  NORMAL_BONUS: "normal-bonus",
  BUNDLE_BONUS: "bundle-bonus",
};
export const ticketStates = {
  BLACKLISTED: "blacklisted",
  WON: "won",
  HELD: "held",
  ONGOING: "ongoing",
  CANCELED: "canceled",
  PENDING: "pending",
  LOST: "lost",
  INACTIVE: "inactive",
  REJECTED: "rejected",
};
export const daysOfTheWeekList = [
  { value: 0, title: "Sunday" },
  { value: 1, title: "Monday" },
  { value: 2, title: "Tuesday" },
  { value: 3, title: "Wednesday" },
  { value: 4, title: "Thursday" },
  { value: 5, title: "Friday" },
  { value: 6, title: "Saturday" },
];
export const durationOptions = [
  { value: "DAILY", label: "Daily Reports" },
  { value: "WEEKLY", label: "Weekly Reports" },
  { value: "MONTHLY", label: "Monthly Reports" },
];

export const gameDrawMethods = {
  MANUAL: "manual",
  RNG: "RNG",
};
export const imageBox = {
  display: "flex",
  justifyContent: "space-between",
};
export const bannerCategories = [
  {
    title: "Top-Desktop",
    value: "top-desktop",
  },
  {
    title: "Top-Mobile",
    value: "top-mobile",
  },
  {
    title: "Left-Desktop",
    value: "left-desktop",
  },
  {
    title: "Right-Desktop",
    value: "right-desktop",
  },

  {
    title: "Box-mobile",
    value: "box-mobile",
  },
  {
    title: "Slider",
    value: "slider",
  },
];
export const booleanFieldStatusData = [
  { title: "None", value: "" },
  { title: "Active", value: "true" },
  { title: "Not Active", value: "false" },
];

export const formatBonusType = (bonus: string) => {
  if (bonus === bonusType.NORMAL_BONUS) {
    return "Normal Bonus";
  }
  return "Bundle Bonus";
};
export const dialogActionsStyles = {
  pr: { xs: 1, sm: 3, md: 4, lg: 5 },
};
export const formatTicketWalletType = (wallet: string) => {
  if (wallet === ticketWalletType.BONUS_WALLET) {
    return "Bonus Wallet";
  }
  if (wallet === ticketWalletType.MAIN_WALLET) {
    return "Main Wallet";
  }
  return wallet;
};
// Set a Cookie
export function setCookie(cName: string, cValue: string, expDays: number) {
  let date = new Date();
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

export const deleteCookie = (cName: string) => {
  document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};
export const getCookie = (cName: string): string | undefined => {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
};
export const saveProfileToStorage = (profile: string) => {
  setCookie(PROFILE_KEY, profile, 1);
};
export const getAuthToken = (): string | null => {
  const res = getCookie(TOKEN_NAME);
  if (res) {
    return res;
  }
  return null;
};
export const getProfileFromStorage = (): string | null => {
  const res = getCookie(PROFILE_KEY);
  if (res) {
    return res;
  }
  return null;
};

export const removeTokenFromStorage = () => {
  deleteCookie(TOKEN_NAME);
  deleteCookie(PROFILE_KEY);
};
export const saveTokenToStorage = (token: string) => {
  setCookie(TOKEN_NAME, token, 1);
};

export const formatErrorMessage = (errObj: any) => {
  // console.log("errObjerrObjerrObjerrObj", errObj);
  if (errObj && errObj?.status && errObj?.status >= 500) {
    return "An Unexepected error occured";
  }
  if (errObj?.response?.data?.responsemessage?.msg) {
    return `${errObj?.response?.data?.responsemessage?.msg}: ${errObj?.message}`;
  }
  if (errObj?.response?.data?.responsemessage) {
    return `${errObj?.response?.data?.responsemessage} : ${errObj?.message}`;
  }
  if (
    errObj?.response?.data?.message &&
    typeof errObj?.response?.data?.message === "string"
  ) {
    return `${errObj?.response?.data?.message}`;
  }
  if (
    errObj?.response?.data?.error &&
    typeof errObj?.response?.data?.error === "string"
  ) {
    return `${errObj?.response?.data?.error}`;
  }
  if (errObj?.message) {
    return errObj?.message;
  }
  return "An Unexepected error occured";
};

export const formatSuccessMessage = (successObj: any) => {
  if (
    successObj?.data?.data?.message &&
    typeof successObj?.data?.data?.message === "string"
  ) {
    return `${successObj?.data?.data?.message}`;
  }
  if (
    successObj?.data?.message &&
    typeof successObj?.data?.message === "string"
  ) {
    return `${successObj?.data?.message}`;
  }
  if (successObj?.message) {
    return successObj?.message;
  }
  return "Request was successful";
};

export const setDefaultHeaders = () => {
  const token = getAuthToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export const setAxiosDefaultHeaders = () => {
  axios.defaults.withCredentials = true;
};

export const isAuthTokenExpired = (): boolean => {
  try {
    const token = getAuthToken();
    let decodedToken: IToken | null = null;

    if (!token) {
      return true;
    }
    if (token) {
      decodedToken = jwtDecode(token);
      // console.log(decodedToken);
      if (decodedToken && decodedToken?.exp !== undefined) {
        let tokenExpired = decodedToken?.exp < new Date().getTime() / 1000;
        if (tokenExpired) {
          toast.error("Your Login Session Have Expired");
          removeTokenFromStorage();

          return true;
        }
      }
    }

    return false;
  } catch (error) {
    console.log("err", error);
    // removeTokenFromStorage();

    return true;
  }
};

export function currencyFormater(
  x: string | number | undefined | null,
  dp = 0
): string {
  if (!x) {
    return "0";
  }
  let parsedString = parseFloat(x?.toString()).toFixed(dp);
  return parsedString?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export const currencyFormater2 = (x: string | number | undefined | null) => {
  if (!x) {
    return 0;
  }
  const amount = parseFloat(x as string);
  if (amount >= 1_000_000) {
    return (amount / 1_000_000).toFixed(1) + "m";
  } else if (amount >= 1_000) {
    return (amount / 1_000).toFixed(1) + "k";
  } else {
    return amount.toString();
  }
};

export function valueFormatter(value: number | null) {
  return `${currencyFormater2(value)}`;
}
export const getWindowQueryString = (name: string) => {
  let result = "";
  if (typeof window === "object") {
    const urlParams = new URLSearchParams(window.location.search);
    result = urlParams.get(name) || "";
  }
  return result;
};

export const reformatRoleName = (role: string) => {
  if (role === adminRoles.SUPER_ADMIN) {
    return "Super Admin";
  }
  if (role === adminRoles.ACCOUNTANT) {
    return "Accountant";
  }
  if (role === adminRoles.ACCOUNT_MANAGER) {
    return "Account Manger";
  }
  if (role === adminRoles.CUSTOMER_CARE_ADMIN) {
    return "Customer Care Admin";
  }
  if (role === adminRoles.FINANCE_ADMIN) {
    return "Finance Admin";
  }
  if (role === adminRoles.MEDIA_MARKETING_ADMIN) {
    return "Media Marketing Admin";
  }
  if (role === adminRoles.RISK_MANAGER) {
    return "Risk Manager";
  }
  if (role === adminRoles.SUPER_ACCOUNTANT) {
    return "Super Accountant";
  }

  if (role === agentRolesObj.PRINCIPAL_AGENT) {
    return "Principal Agent";
  }
  if (role === agentRolesObj.ORDINARY_AGENT) {
    return "Ordinary Agent";
  }
  if (role === agentRolesObj.SUPER_AGENT) {
    return "Super Agent";
  }
  if (role === agentRolesObj.CASHIER) {
    return "Cashier";
  }
  return role?.toString();
};

export const formatWeekdays = (weekday: number | undefined) => {
  if (weekday === 0) return "Sunday";
  if (weekday === 1) return "Monday";
  if (weekday === 2) return "Tuesday";
  if (weekday === 3) return "Wednesday";
  if (weekday === 4) return "Thursday";
  if (weekday === 5) return "Friday";
  if (weekday === 6) return "Saturday";

  return "";
};

export const parseStringToArray = (str: string | undefined) => {
  if (str && typeof str === "string") {
    let splitedArr: string[] | number[] = str?.split("-");
    splitedArr = splitedArr?.map((item) => parseInt(item));
    return splitedArr;
  }
  return [];
};

// To safely JSON.parse a string without breaking the application
export const safeJSONParse = (str: string) => {
  try {
    let resultArray: any[] = [];
    let parseArray = [];
    if (typeof str === "undefined" || str === "") {
      return resultArray;
    }
    parseArray = JSON?.parse(str);
    for (const key in parseArray) {
      if (Object.hasOwnProperty.call(parseArray, key)) {
        const element = parseArray[key];
        // console.log('keyy', element);
        resultArray.push(element);
      }
    }

    return resultArray;
  } catch (error) {
    console.log("err while parseing", error);
  }
};

export const safeJSONParseObj = (str: string) => {
  try {
    let resultObj = {};

    if (typeof str === "undefined") {
      return resultObj;
    }
    resultObj = JSON.parse(str);

    return resultObj;
  } catch (error) {
    console.log("err while parseing", error);
  }
};
export function getImgUrl(name: string) {
  return new URL(`${name}`, import.meta.url).href;
}
export const renderGameDrawDate = (value: TicketResultType): string => {
  if (!value?.Game?.recurring && value?.dateTime) {
    return dayjs(value.dateTime).format(FULL_DATE_FORMAT);
  }
  return dayjs(value.createdAt).format(FULL_DATE_FORMAT);
};
export const isUserAuthorized = (permission: string): boolean => {
  try {
    const token = getAuthToken();
    const { role } = jwtDecode<IToken>(token || "");

    if (!role) {
      return false;
    }
    if (role && role === adminRoles.SUPER_ADMIN) {
      return true;
    }
    const foundRole = rolesPermissions[role];
    if (!foundRole) {
      return false;
    }
    const foundPermission = foundRole.find((role) => role === permission);
    if (!foundPermission) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getSumFromObj = (data: any) => {
  let total = 0;

  for (const item in data) {
    let elem = data[item];
    total += elem;
  }

  return total;
};

export const getStakedAmountSum = (array: { totalStakedAmount: string }[]) => {
  let initialValue = 0;

  for (let index = 0; index < array.length; index++) {
    let element: string | number = array[index].totalStakedAmount;
    element = parseFloat(element);
    initialValue += element;
  }
  return initialValue.toFixed(2);
};
export const getWinningAmountSum = (array: { totalWinAmount: string }[]) => {
  let initialValue = 0;

  for (let index = 0; index < array.length; index++) {
    let element: string | number = array[index].totalWinAmount || 0;
    element = parseFloat(element?.toString());
    initialValue += element;
  }
  return initialValue.toFixed(2);
};

export function sumByKey<T>(arr: T[], key: keyof T): number {
  return arr.reduce((sum, obj) => {
    const value = obj[key];
    return (
      sum +
      (typeof value === "number"
        ? value
        : typeof value === "string"
        ? parseFloat(value)
        : 0)
    );
  }, 0);
}

export const totalSumStyles = {
  fontWeight: 600,
  fontSize: "14px",
};

export function arrayToCSV<T>({
  data,
  header,
}: {
  data: T[];
  header: string[];
}): string {
  return [header, ...data].join("\n"); // Join header and rows with new lines
}

export function downloadCSV<T>({
  data,
  header,
  filename,
}: {
  data: T[];
  header: string[];
  filename: string;
}): void {
  const csv = arrayToCSV({ data, header });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);

  // Append the link to the body (not visible to the user)
  document.body.appendChild(link);
  link.click(); // Trigger the download
  document.body.removeChild(link); // Clean up
}

export function generateRandomIntegerInRange(min: number = 1, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const generateRandomColour = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return "#" + n.slice(0, 6);
};

export const convertStringToBoolean = (val: string) => {
  if (val === "true") {
    return true;
  }
  return false;
};

export const convertBooleanToString = (val: boolean) => {
  if (val === true) {
    return "true";
  }
  return "false";
};

export const renderOrderStatus = (val: number) => {
  if (val === 1) {
    return "order-placed";
  }
  if (val === 2) {
    return "order-confirmed";
  }
  if (val === 3) {
    return "in-transit";
  }
  if (val === 4) {
    return "pickup-ready";
  }
  return "order-delivered";
};
