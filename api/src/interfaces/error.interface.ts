export interface IError {
  type: "critical" | "log" | "warning" | "info" | "debug";
  message: string;
}
