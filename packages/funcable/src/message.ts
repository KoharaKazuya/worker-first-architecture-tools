import {
  FuncableMessage,
  FuncableMessageInvocationRequest,
  FuncableMessageInvocationResponse,
  FuncableMessageSign
} from "./protocol";

const sign: FuncableMessageSign = "FuncableMessage";

export function isFuncableMessage(x: unknown): x is FuncableMessage {
  if (!(typeof x === "object" && x !== null)) return false;
  return (x as any).sign === sign;
}

export function isInvocationRequest(
  x: unknown
): x is FuncableMessageInvocationRequest {
  if (!isFuncableMessage(x)) return false;
  return x.type === "InvocationRequest";
}

export function createInvocationRequest(
  name: string,
  args: any[]
): FuncableMessageInvocationRequest {
  return {
    sign,
    type: "InvocationRequest",
    id: createID(),
    name,
    args
  };
}

export function isInvocationResponse(
  x: unknown
): x is FuncableMessageInvocationResponse {
  if (!isFuncableMessage(x)) return false;
  return x.type === "InvocationResponse";
}

export function createInvocationResponse(
  id: string,
  result: any,
  success = true
): FuncableMessageInvocationResponse {
  return { sign, type: "InvocationResponse", id, success, result };
}

function createID(): string {
  return new Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
    .join("-");
}
