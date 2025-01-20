import { FileUploadType } from "src/utils/types";

export type ContestantOddType = {
  odd: null | number;
  position: number;
};
export type ContestantType = {
  id: number;
  contestantId: string;
  customContestantId: string;
  firstname: string;
  lastname: string;
  alias: string;
  avatarUrl: string;
  videoUrl: string | null;
  gameId: string;
  resultPosition: null | string;
  description: string;
  status: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  ContestGame: ContestType;
  ContestantOption: {
    id: number;
    contestantId: string;
    odds: ContestantOddType[];
    status: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
  };
};
export type ContestType = {
  gameId: string;
  customGameId: string;
  title: string;
  description: string;
  category: string;
  metadata: {
    attachedGameId: string;
  };
  eventDate: string;
  week: null;
  endDate: string;
  maxContestantsAllowed: number;
  hasResult: boolean;
  imageUrl: string;
  audioUrl: null | string;
  status: boolean;
  deleted: boolean;
  Contestants: ContestantType[];
  ContestResult: null;
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateContestType = {
  imageUrl: FileUploadType;
  audioUrl: FileUploadType;
  title: string;
  customGameId: string;
  startDate: string;
  endDate: string;
  description: string;
  maxContestantsAllowed: number;
  category: string;
  metadata: string;
};
export type CreateContestantOddType = {
  results: string[];
};
export type CreateContestantType = {
  gameId: string;
  firstname: string;
  lastname: string;
  alias: string;
  avatarUrl: string;
  customContestantId: string;
  description: string;
  results?: string[];
};

export type ContestBetSlipType = {
  id: number;
  ticketId: string;
  stakedAmount: string;
  oddMultiplier: string;
  contestantId: string;
  betType: string;
  resultType: string;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  Contestant: ContestantType;
};
export type ContestTicketType = {
  id: number;
  ticketId: string;
  userId: string;
  gameId: string;
  type: string;
  referenceId: string;
  totalStakedAmount: string;
  totalWinAmount: null;
  winningRedemptionMethod: string;
  sourceWallet: string;
  resultId: null | string;
  tenantId: number;
  hasClaimedWinning: boolean;
  metaConfigs: null;
  cloned: boolean;
  status: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  User: {
    role: string;
    phone: null;
    email: string;
    status: true;
    isAgent: boolean;
    lastname: string;
    firstname: string;
  };
  BetSlips: ContestBetSlipType[];
  ContestGame: ContestType;
  ContestResult: null;
};

export type MultipleContestResultType = {
  id: number;
  resultId: string;
  drawName: null | string;
  gameId: string;
  results: {
    result: number;
    contestantId: string;
  }[];
  isApproved: boolean;
  status: string;
  ticketCount: number;
  createdAt: string;
  updatedAt: string;
  ContestGame: ContestType;
};

export type SingleContestResultType = {
  id: number;
  resultId: string;
  drawName: null | string;
  gameId: string;
  results: {
    result: number;
    contestantId: string;
  }[];
  isApproved: boolean;
  status: string;
  ticketCount: number;
  createdAt: string;
  updatedAt: string;
  ContestGame: ContestType;
  ContestantInfos: {
    sn: number;
    contestantId: string;
    result: number;
    Contestant: ContestantType;
  }[];
};
