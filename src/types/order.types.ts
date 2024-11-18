export const ORDER_STRING = {
  desc: "desc",
  asc: "asc"
} as const;

export type Order = keyof typeof ORDER_STRING;
// export interface Order {
//   value: "desc" | "asc";
// }
