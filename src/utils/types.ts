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
export type UserType = {
  userId: string;
  firstname: string;
  lastname: string;
  avatarUrl: string | null;
  email: string;
  phone: string;
  walletBalance: string;
  commissionBalance: string;
  bonusWallet: string;
  bonusStatus: string;
  bundleWallet: string;
  dailyLimit: string;
  cancellationLimit: string;
  hasVerifiedEmail: boolean;
  hasMinimumDailyWalletBalance: boolean;
  status: boolean;
  role: string;
  isAgent: boolean;
  hasSetPin: boolean;
  referredBy: string | null;
  referralCode: string;
  multiplier: string;
  lastLogin: string;
  loginCount: number;
  bankName: string | null;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  imageUrl: string;
  portfolio: string;
  downlines: DownlineType[];
  excludedAgentBetTypes: {
    lotteryId: string;
    lotteryName: string;
    betTypes: string[];
  }[];
  AssignedBonus: null | AssignedBonusType;
  agentAgg: AgentAggType;
  createdAt: string;
  updatedAt: string;
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
export type OverUnderOptionType = {
  name: string;
  value: string;
  number: number;
  description: string;
};

export type BannerType = {
  bannerId: string;
  title: string;
  content: string;
  category: string;
  imageUrl: string;
  url: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  ctaText: string;
  foregroundImage: string;
};

export type UserMultipleTicketsType = {
  ticketId: string;
  referenceId: string;
  userId: string;
  associatedUserId: null | string;
  bookingCode: string | null;
  linesCount: number;
  totalStakedAmount: string | number;
  totalWinAmount: string | number;
  betSlips: string;
  cloned: boolean;
  raffle: string;
  gameStatus: string;
  gameName: string;
  winningRedemptionMethod: string;
  sourceWallet: string;
  details: string;
  status: string;
  blockedKey: string | null;
  resultId: string;
  createdAt: string;
  updatedAt: string;

  tenantId: string | null;
  redeemedBy: string | null;
  agentCommission: string;
  remittance: string;
  User: {
    role: string;
    phone: string | null;
    email: string;
    status: boolean;
    isAgent: boolean;
    lastname: string;
    firstname: string;
  };
  Game: {
    gameId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
    recurringInterval: number;
    weekday: number;
    currentPoolAmount: number;
    totalFundPool: number | null;
    alternateStartDate: string | null;
    mrf: string | null;
    imageUrl: null;
    lotteryName: string;
    lotteryId: string;
    drawMethod: string;
    status: boolean;
    restartedAt: string;
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
      audioUrl: string | null;
      imageUrl: string | null;
    };
  };
  Gameresult: {
    date: string;
    results: string;
    raffle: string;
    S_N: number;
    drawName: string;
  };
};

export type SingleTicketType = {
  id: number;
  ticketId: string;
  referenceId: string;
  userId: string;
  associatedUserId: null | string;
  tenantUserId: null | string;
  bookingCode: null | string;
  linesCount: number;
  totalStakedAmount: string;
  totalWinAmount: string;
  betSlips: string; // '[{"betType":"match-2","amount":100,"selections":"05-02","resultType":"null","overUnder":null,"booster":"null","hasWon":boolean,"winningCombo":"any-N","sn":1,"linesCount":1,"stakedAmount":"100.00","agentCommission":"7.00","affiliate":"3.50","IB":"1.0000","potentialWinning":}]';
  cloned: boolean;
  raffle: string; // '[{"code":"BOKO4","winAmount":null}]';
  gameStatus: string;
  gameName: string;
  winningRedemptionMethod: string;
  sourceWallet: string;
  details: string; //"{}";
  status: string;
  blockedKey: null | string;
  tenantId: number;
  resultId: string;
  redeemedBy: null | string;
  agentCommission: string;
  remittance: string;
  createdAt: string;
  updatedAt: string;
  gameId: string;
  User: {
    role: string;
    phone: string;
    email: string;
    status: boolean;
    isAgent: boolean;
    lastname: string;
    firstname: string;
  };
  Game: {
    gameId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
    recurringInterval: number;
    weekday: number;
    imageUrl: null | string;
    currentPoolAmount: string;
    totalFundPool: null | number;
    alternateStartDate: null | string;
    mrf: null | string;
    lotteryName: string;
    lotteryId: string;
    drawMethod: string;
    roundNumber: string;
    status: boolean;
    restartedAt: string;
    Lottery: {
      slug: string;
      category: string;
      audioUrl: string;
      imageUrl: string;
      gameCount: string;
      betOptions: string;
      overOptions: string;
      resultCount: number;
      underOptions: string;
      resultOptions: string;
      boosterOptions: string;
    };
  };
  Gameresult: null;
  AssociatedUser: null;
  redemptionCode: string;
  unclaimedWinning: string;
};

export type TicketCreatedType = {
  ticketId: string;
  referenceId: string;
  userId: string;
  associatedUserId: null | string;
  bookingCode: string | null;
  linesCount: number;
  totalStakedAmount: string | number;
  totalWinAmount: string | number;
  betSlips: {
    betType: string;
    booster: string;
    resultType: string;
    selections: string;
    overUnder: { over?: string; under?: string } | null;
    amount: number;
    hasWon: null | boolean;
    linesCount: number;
    potentialWinning: { min: number; max: number } | string;
  }[];
  cloned: boolean;
  gameStatus: string;
  gameName: string;
  winningRedemptionMethod: string;
  sourceWallet: string;
  details: string;
  status: string;
  blockedKey: string | null;
  resultId: string;
  createdAt: string;
  redemptionCode: string;
  updatedAt: string;
  raffle:
    | {
        code: string;
        winAmount: null | number;
      }[];
  Game: {
    gameId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
    recurringInterval: number;
    weekday: number;
    currentPoolAmount: number;
    totalFundPool: number | null;
    alternateStartDate: string | null;
    mrf: string | null;
    imageUrl: null;
    lotteryName: string;
    lotteryId: string;
    drawMethod: string;
    status: boolean;
    restartedAt: string;
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
      audioUrl: string | null;
      imageUrl: string | null;
    };
  };
  Gameresult: {
    date: string;
    results: string;
    raffle: string;
    S_N: number;
    drawName: string;
  };
  roundNumber: number;
};

export type BetSlipType = {
  betType: string;
  resultType: string;
  amount: number;
  selections: string;
  booster: null;
  overUnder: { over?: string; under?: string } | null;
  hasWon: boolean;
  winningCombo: string | null;
  linesCount: number;
  stakedAmount: number | string;
  agentCommission: number | string;
  affiliate: string | number;
  potentialWinning: number | { min?: number; max?: number };
  winAmount: number | string;
  maxPotentialWinning?: number | string;
  minPotentialWinning?: number | string;
};

export type BetSlipPayloadType = {
  betType: string;
  resultType?: string;
  booster?: null | string;
  amount: number;
  selections: string;
  overUnder: { over?: string; under?: string } | null;
};

export type UserMultipleBookedCodeType = {
  ticketId: string;
  referenceId: string;
  userId: string;
  associatedUserId: null | string;
  bookingCode: string | null;
  linesCount: number;
  totalStakedAmount: string | number;
  totalWinAmount: string | number;
  betSlips: string;
  cloned: boolean;
  raffle: string;
  gameStatus: string;
  gameName: string;
  winningRedemptionMethod: string;
  sourceWallet: string;
  details: string;
  status: string;
  blockedKey: string | null;
  resultId: string;
  createdAt: string;
  updatedAt: string;
  Game: {
    gameId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
    recurringInterval: number;
    weekday: number;
    currentPoolAmount: number;
    totalFundPool: number | null;
    alternateStartDate: string | null;
    mrf: string | null;
    imageUrl: null;
    lotteryName: string;
    lotteryId: string;
    drawMethod: string;
    status: boolean;
    restartedAt: string;
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
      audioUrl: string | null;
      imageUrl: string | null;
    };
  };
  User: {
    role: string;
    phone: string;
    email: string;
    status: string;
    lastname: string;
    firstname: string;
    isAgent: boolean;
  };
};

export type TransactionType = {
  transactionId: string;
  id: number;
  referenceId: string;
  transactionType: string;
  transactionSource: string;
  amount: string;
  narration: string;
  provider: string;
  userId: string;
  previousBalance: string;
  currentBalance: string;
  status: string;
  adminId: string | null;
  transferdByAdmin: boolean;
  deleted: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;

  User: {
    role: string;
    phone: string;
    email: string;
    status: string;
    lastname: string;
    firstname: string;
    isAgent: boolean;
  };
};
export type WithdrawalRequestType = {
  transactionId: string;
  requestId: string;
  isApproved: boolean;
  id: number;
  referenceId: string;
  transactionType: string;
  transactionSource: string;
  approvedBy: string;
  amount: string;
  narration: string;
  provider: string;
  userId: string;
  previousBalance: string;
  status: string;
  bankDetails: string;
  adminId: string | null;
  transferdByAdmin: boolean;
  deleted: boolean;
  version: number;
  createdAt: string;
  updatedAt: string;

  User: {
    role: string;
    phone: string;
    email: string;
    status: string;
    lastname: string;
    firstname: string;
    isAgent: boolean;
  };
};

export type BankType = {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TicketCreatePayload = {
  lotteryId: string;
  betSlips: string;
  linesCount: string | number;
  totalStakedAmount: string | number;
  sourceWallet: string;
  winningRedemptionMethod: string;
  gameId: string;
  bankDetails?: string;
  bookingCode?: string;
};

export type OverdraftType = {
  transactionId: string;
  referenceId: string;
  uplineId: string | null;
  uplineName: string;
  downlineId: string;
  downlineName: string;
  initialAmount: string;
  remainingAmount: string;
  type: string;
  status: boolean;
  expiresAt: string;
  deleted: string;
  adminName: string | null;
  adminId: string | null;
  agentRole: string;
  createdAt: string;
  updatedAt: string;
};

export type ReportType = {
  totalStakedAmount: {
    [key: string]: number;
  };
  totalWinAmount: {
    [key: string]: number;
  };
  totalProfits: {
    [key: string]: number;
  };
  games: string[];
  result: {
    createdOn: string;
    userId: string;
    username: string;
    totalticketCount: number;
    totalWinAmount: number;
    totalStakedAmount: number;
    totalProfits: number;
    gameName: {
      game: string;
      amount: number;
    }[];
  }[];
};
export type GameSalesCategoryType = {
  createdOn: string;
  ticketCount: number;
  totalWon: number;
  totalSold: number;
  commissionCount: number;
  totalCommission: number;
  totalProfit: number;
  totalProfits: string;
  profit: number;
};
export type GameSalesReportType = {
  categories: {
    [key: string]: GameSalesCategoryType[];
  };
  totalProfits: {
    [key: string]: number;
  };
  totalWinnings: {
    [key: string]: number;
  };
  totalCommissions: {
    [key: string]: number;
  };
  totalSales: {
    [key: string]: number;
  };
};
export type TicketResultType = {
  S_N: number;
  resultId: string;
  date: string;
  dateTime: string | null;
  drawName: string;
  results: string;
  raffle: string;
  roundNumber: number;
  category: string;
  isApproved: boolean;
  ticketCount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  gameId: string;
  Game: GameTicketResultType;
};
export type GameTicketResultType = {
  gameId: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  recurring: boolean;
  recurringInterval: number;
  weekday: number;
  imageUrl: string | null;
  currentPoolAmount: string;
  totalFundPool: number | null;
  alternateStartDate: string | null;
  mrf: string | null;
  lotteryName: string;
  lotteryId: string;
  drawMethod: string;
  roundNumber: number;
  status: boolean;
  restartedAt: string | null;
};
export type BookedCodeUserType = {
  userId: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  status: number | boolean;
  avatarUrl: string | null;
  ticketId: string;
  gameId: string;
  bookingCode: string;
  commission: string;
  createdAt: string;
};

export type LotteryType = {
  lotteryId: string;
  slug: string;
  name: string;
  imageUrl: string;
  audioUrl: string;
  gameCount: number;
  resultCount: number;
  category: string;
  betOptions: string;
  boosterOptions: string;
  resultOptions: string;
  overOptions: string;
  underOptions: string;
  setA: boolean;
  setB: boolean;
  status: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  Games: GameType[];
};
export type SalesReportCategoryType = {
  createdOn: string;
  ticketCount: number;
  totalWon: number;
  totalSold: number;
  commissionCount: number;
  totalCommission: number;
};
export type SalesReportType = {
  categories: {
    [key: string]: SalesReportCategoryType[];
  };
  totalWinnings: {
    [key: string]: number;
  };
  totalCommissions: {
    [key: string]: number;
  };
  totalSales: {
    [key: string]: number;
  };
  startBalance: string;
  currentMainBalance: string;
  currentCommissionBalance: string;
  principalAgent: string;
  superAgent: string;
  ordinaryAgent: string;
};

export type ForecastType = {
  id: number;
  forecastId: string;
  gameId: string;
  date: string;
  category: string;
  selections: string;
  createdAt: string;
  updatedAt: string;
  Game: GameType;
};
export type FrequencyType = {
  selection: number;
  frequency: number;
};

export type BonusType = {
  bonusId: string;
  title: string;
  description: string;
  type: string;
  depositRound: string;
  winCount: number;
  isConsecutive: boolean;
  unitCost: string;
  quantity: number;
  gameType: string;
  Game: {
    gameId: string;
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    recurring: boolean;
    recurringInterval: number;
    weekday: number;
    imageUrl: null | string;
    currentPoolAmount: string;
    totalFundPool: null | number;
    alternateStartDate: null | string;
    mrf: null | string;
    lotteryName: string;
    lotteryId: string;
    drawMethod: string;
    roundNumber: number;
    status: boolean;
    restartedAt: string;
  };
  betType: string;
  expiration: number;
  minimumDeposit: string;
  prize: string;
  gamePlayCount: number;
  commission: number;
  stopped: boolean;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AppliedBonusType = {
  id: number;
  userId: string;
  bonusId: string;
  title: string;
  depositRound: string;
  winCount: number;
  consecutiveWinCount: number;
  gameType: string;
  betType: string;
  expiration: string;
  minimumDeposit: string;
  prize: string;
  gamePlayCount: number;
  status: boolean;
  isQualified: boolean;
  createdAt: string;
  updatedAt: string;
  Bonus: {
    status: boolean;
    stopped: boolean;
    winCount: number;
    description: string;
    isConsecutive: boolean;
    gamePlayCount: number;
    Game: {
      gameId: string;
      name: string;
      description: string;
      startTime: string;
      endTime: string;
      recurring: boolean;
      recurringInterval: number;
      weekday: number;
      imageUrl: string;
      currentPoolAmount: string;
      totalFundPool: null | string;
      alternateStartDate: null | string;
      mrf: null | string;
      lotteryName: string;
      lotteryId: string;
      drawMethod: string;
      roundNumber: number;
      status: boolean;
      restartedAt: string;
    };
  };
  User: {
    role: string;
    phone: string;
    email: string;
    status: boolean;
    isAgent: boolean;
    lastname: string;
    firstname: string;
  };
};

export type StaticPageType = {
  contentId: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  status: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
};

export type LogType = {
  adminId: string;
  requestMethod: string;
  name: string;
  action: string;
  date: string;
  actionString: string;
};

export type UplineCommissionType = {
  agentRole: null | string;
  amount: string;
  commissionId: string;
  details: string;
  recipientId: string;
  recipientName: string;
  senderId: string;
  senderName: string;
  sourceId: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type BundleType = {
  id: number;
  bundleId: string;
  userId: string;
  bonusId: string;
  unitCost: string;
  quantity: number;
  moq: number;
  assignedBy: null | string;
  initialQuantityAssigned: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
  Bonus: {
    title: string;
    depositRound: string;
    winCount: number;
    prize: string;
    stopped: boolean;
    description: string;
    isConsecutive: boolean;
    gamePlayCount: number;
  };
  User: {
    firstname: string;
    lastname: string;
    isAgent: boolean;
    status: boolean;
    phone: string;
    email: string;
    role: string;
  };
};

export type StatisticsType = {
  totalPlayers: number;
  totalTickets: number;
  totalAgents: number;
  totalTransactions: number;
  totalAdmins: number;
  totalLotteries: number;
  totalGameInstances: number;
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

export type PayoutType = {
  id: number;
  payoutId: string;
  userId: string;
  ticketId: string;
  bankDetails: string;
  amount: string;
  winningRedemptionMethod: string;
  isPaid: boolean;
  paymentDate: string;
  receipientCode: null | string;
  attempts: number;
  info: string;
  status: string;
  createdAt: string;
  updatedAt: string;
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
