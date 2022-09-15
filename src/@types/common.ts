export type Base = Record<string, unknown>;
export type Nullable<T> = T | null;
export type Undefined<T> = T | undefined;
export type SetInterval = Nullable<ReturnType<typeof setInterval>>;
