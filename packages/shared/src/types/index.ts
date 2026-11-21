export type Id = string;

export interface ApiResponse<T> {
  data: T;
  message?: string;
}
