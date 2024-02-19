export type HistoryEntryDetails = {
  country: string;
  countryCode: string;
  city: string;
  hostname: string;
  ipv4_address?: string;
};

export type HistoryEntry = { count: number; timestamp: number } & HistoryEntryDetails;

export type HistoryEntriesMap = {
  [key: string]: HistoryEntry;
};
