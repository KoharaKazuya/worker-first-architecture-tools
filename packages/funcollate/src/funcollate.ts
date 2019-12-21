import produce from "immer";
import { applyPatch, createPatch, Operation } from "rfc6902";

type Difference = Operation[];

export function diff<T>(prev: T, next: T): Difference {
  return createPatch(prev, next);
}

export function patch<T>(prev: T, diff: Difference): T {
  return produce(prev, draft => {
    applyPatch(draft, diff);
  });
}
