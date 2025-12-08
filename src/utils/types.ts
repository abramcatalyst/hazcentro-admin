import React from "react";
import { JwtPayload } from "jwt-decode";

export interface IToken extends JwtPayload {
  email: string;
  sub: string;
  createdAt: string;
  exp: number;
  hasVerifiedEmail: boolean;
  iat: number;
  lastLogin: string;
  name: string;
  phone: null;
  role: string;
  status: boolean;
}

export interface IMongoose {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type FileUploadResType = {
  url: string;
  id: string;
};
export type GameType = {
  gameId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  recurring: boolean;
  recurringInterval: string | null;
  weekday: number;
  currentPoolAmount: number;
  totalFundPool: number;
  alternateStartDate: string | null;
  mrf: null;
  imageUrl: string;
  lotteryName: string;
  lotteryId: string;
  rafflePrize: string;
  minStakedAmount: string;
  drawMethod: string;
  status: boolean;
  restartedAt: string;
  createdAt: string;
  updatedAt: string;
  Lottery: {
    betOptions: string;
    boosterOptions: string;
    resultOptions: string;
    overOptions: string;
    underOptions: string;
    slug: string;
    gameCount: number;
    resultCount: number;
    category: string;
    audioUrl: string;
    imageUrl: string;
  };
};

export type GameCategoryImageType = {
  name: string;
  icon: string;
  slugs: {
    betTypes: string;
    boosters: string;
    resultTypes: string;
  };
};
export type DownlineType = {
  id: number;
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  avatarUrl: null | string;
  walletBalance: string;
  commissionBalance: string;
  bonusWallet: string;
  bundleWallet: string;
  referralCode: null;
  referredBy: string;
  hasVerifiedEmail: boolean;
  status: boolean;
  suspensionType: null;
  role: string;
  canCreateRole: null;
  maxCreateCount: null;
  isAgent: boolean;
  multiplier: string;
  lastLogin: string;
  loginCount: number;
  mainBalanceAtStartOfDay: string;
  commissionEligibilityStatus: string;
  bonusAssignedBy: null;
  bonusAssignedAt: null;
  tenantId: number;
  introducerId: null | number;
  hasVerifiedPhone: boolean;
  ticketRemittance: string;
  userRemittance: string;
  redeemedTotal: string;
  lastRedeemedAgg: null | string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  assignedBonusId: null | string;
  totalCommission: number;
  totalStakedAmount: number;
  dailyLimit: string;
  cancelationLimit: string;
  Config: {
    id: number;
    userId: string;
    transactionPin: string | null;
    bankName: null | string;
    bankCode: null | string;
    accountNumber: null | string;
    accountName: null | string;
    dailyLimit: string;
    deviceId: null | string;
    bonusStatus: string;
    excludedAgentBetTypes: string[];
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
export type AssignedBonusType = {
  bonusId: string;
  title: string;
  gameType: string;
  betType: string;
  type: string;
  prize: string;
  quantity: number;
};

export type AgentAggType = {
  portfolio: null | number;
  remmittance: null | number;
  redeemedTotal: null | number | string;
  totalSales: null | number;
};

export type BetOptionType = {
  name: string;
  value: string;
  number: number;
  description: string;
  isSetAB: boolean;
  min: number;
  max: number;
  minA: number;
  maxA: number;
  minB: number;
  maxB: number;
};
export type BetOptionCreateType = {
  name: string;
  value: string;
  number: number;
  description: string;
  isSetAB: boolean;
  min: number;
  max: number;
  minA: number;
  maxA: number;
  minB: number;
  maxB: number;
  multiplier: number;
};

export type NavigationType = {
  kind: "divider" | "page" | "header" | "gap";
  id: number;
  segment?: string;
  title?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  url?: string;
  permission: string;
  hasBadge?: boolean;
  invertIcon?: boolean;
  children?: {
    kind: "divider" | "page" | "header";
    id: number;
    icon: React.ReactNode;
    title?: string;
    segment?: string;
    url?: string;
    permission: string;
  }[];
};

export type AdminType = {
  adminId: string;
  name: string;
  email: string;
  phone: null | string;
  role: string;
  tenantId: 1;
  hasVerifiedEmail: boolean;
  lastLogin: string;
  status: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  Tenant: {
    tenantId: 1;
    tenantUID: string;
    name: string;
    apiKey: null | string;
    status: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

export type CreateGameType = {
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  isRecurring: boolean;
  recurringInterval: number;
  totalFundPool: number;
  rafflePrize: number;
  minStakedAmount: number;
  alternateStartDate: null | string;
  mrf?: string;
  dayOfTheWeek: number;
  drawMethod: string;
  lotteryId: string;
};

export type FileUploadType = File | Blob | MediaSource | null;

export type AppSettingsContentType = {
  description: string;
  name: string;
  number: number;
  value: string;
};

export type CommissionReportType = {
  TotalCommission: {
    string: number;
  };
  games: string[];
  result: {
    createdOn: string;
    userId: string;
    email: string;
    username: string;
    totalticketCount: number;
    TotalCommission: number;
    gameName: {
      game: string;
      amount: number;
    }[];
  }[];
};
export type WinningCheckResponseSlipType = {
  selections: string[];
  betType: string;
  resultType: string;
  stakedAmount: string;
  winAmount: string;
  ticketId: string;
};
export type WinningCheckType = {
  responseSlips: WinningCheckResponseSlipType[];
  betTypeTotals: { betType: string; count: number; total: number }[];
  totalWinners: number;
  totalWon: number;
  totalStaked: null | number;
};

export type DefaultAvatarType = {
  avatarUrl: string;
};

export type CreateBundleType = {
  title: string;
  winCount: number;
  gameType: string;
  betType: string;
  expiration: string;
  prize: number;
  gamePlayCount: number;
  type: string;
  unitCost: number;
  description: string;
};

export type CreateBonusType = {
  title: string;
  winCount: number;
  gameType: string;
  betType: string;
  expiration: string;
  prize: number;
  gamePlayCount: number;
  type: string;
  unitCost: number;
  minimumDeposit: number;
  depositRound: string;
  description: string;
};

export type AppSettingType = {
  settingId: string;
  slug: string;
  title: string;
  content: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateSiteSettingType = {
  title: string;
  slug: string;
  content: {
    name: string;
    value: string;
    number: string;
    description: string;
  }[];
};
export type LotteryImageContentType = {
  name: string;
  icon: string;
  slugs: { betTypes: string; boosters: string; resultTypes: string };
};

export type UsersStatsType = {
  totalUsers: number;
  suspendedUsers: number;
  deletedUsers: number;
};

export type TransactionsStatsType = {
  totalTransactions: number;
  totalSuccessfulTransactions: number;
  totalSuccessfulTransactionsAmount: number;
  totalFailedTransactions: number;
  totalFailedTransactionsAmount: number;
  totalPendingTransactions: number;
  totalPendingTransactionsAmount: number;
  totalDeletedTransactions: number;
};

export type SingleGameInstanceStatsType = {
  totalTickets: number;
  totalSaleAmount: number;
  totalNumberOfPlayers: number;
  activeTickets: number;
  deletedTickets: number;
};

export type AllGameInstanceStatsType = {
  totalGameInstances: number;
  activeGameInstances: number;
  inactiveGameInstances: number;
  deletedGameInstances: number;
};

export type AllTicketStatsType = {
  totalTickets: number;
  totalSaleAmount: number;
  totalWonTickets: number;
  totalWonTicketAmount: number;
  totalLostTickets: number;
  totalPendingTickets: number;
  totalDeletedTickets: number;
  totalCancelledTickets: number;
  totalCancelledTicketAmount: number;
};

export type AllLotteriesStatsType = {
  totalLotteries: number;
  activeLotteries: number;
  inactiveLotteries: number;
  deletedLotteries: number;
};

export type FilterSelectOptionsTypes = {
  value: string;
  title: string;
};
