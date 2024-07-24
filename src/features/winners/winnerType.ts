export type Winner = {
  id: number;
  wins: number;
  time: number;
};
export type WinnersState = {
  entities: Winner[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};
