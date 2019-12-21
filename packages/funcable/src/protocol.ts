export type Endpoint = Pick<
  MessagePort,
  "addEventListener" | "removeEventListener" | "postMessage"
>;

export interface AsyncFunctions {
  [key: string]: (...args: any[]) => Promise<any>;
}

export type FuncableMessageSign = "FuncableMessage";
export interface FuncableMessageBase {
  sign: FuncableMessageSign;
  type: string;
}
export interface FuncableMessageInvocationRequest extends FuncableMessageBase {
  type: "InvocationRequest";
  id: string;
  name: string;
  args: any[];
}
export interface FuncableMessageInvocationResponse extends FuncableMessageBase {
  type: "InvocationResponse";
  id: string;
  success: boolean;
  result: any;
}
export type FuncableMessage =
  | FuncableMessageInvocationRequest
  | FuncableMessageInvocationResponse;
