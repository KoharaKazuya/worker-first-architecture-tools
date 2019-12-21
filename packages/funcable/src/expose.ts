import { createInvocationResponse, isInvocationRequest } from "./message";
import { AsyncFunctions, Endpoint } from "./protocol";

export default function expose(
  target: AsyncFunctions,
  endpoint: Endpoint = self as any
) {
  endpoint.addEventListener("message", async ({ data }) => {
    if (!isInvocationRequest(data)) return;
    const f = target[data.name];
    try {
      const result = await f(...data.args);
      endpoint.postMessage(createInvocationResponse(data.id, result));
    } catch (err) {
      endpoint.postMessage(createInvocationResponse(data.id, err, false));
    }
  });
}
