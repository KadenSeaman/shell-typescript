export const isDef = <T>(val: T): val is NonNullable<T> => {
  return val !== undefined;
};

export const isNull = <T>(val: T): val is Exclude<T, null> => {
  return val !== null;
};
