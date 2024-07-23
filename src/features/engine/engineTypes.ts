export type Engine = {
    id: number;
    velocity: number;
    status: 'drive' | 'broken' | 'started';
};
export type EngineState = {
  entities: Engine[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error?: string;
};