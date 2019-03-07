export interface IError {
  type: "critical" | "error" | "warning";
  status: number;
  message: string;
}
