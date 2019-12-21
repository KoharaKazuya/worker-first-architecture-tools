export interface AsyncFunctions {
  [key: string]: (...args: any[]) => Promise<any>;
}
