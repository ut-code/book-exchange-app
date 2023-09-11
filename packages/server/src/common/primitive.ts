type Primitive = string | number | boolean | bigint | symbol | undefined | null;

export type FilterPrimitive<T> = {
  [K in keyof T]: T[K] extends Primitive ? K : never;
}[keyof T];

export type PickPrimitive<T> = Pick<T, FilterPrimitive<T>>;
