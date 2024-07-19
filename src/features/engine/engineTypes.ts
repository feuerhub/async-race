export type Engine = {
    id: number;
    velocity: number;
    distance: number;
};
export type EngineState = {
  entities: Engine[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};