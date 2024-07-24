export type Car = {
  name: string;
  color: string;
  id: number;
};
export type GarageState = {
  entities: Car[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};
