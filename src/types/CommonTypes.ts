export type StringToParam<S extends string> =
  S extends `${string}[${infer s}]${infer n}` ? s | StringToParam<n> : never

export type RemovePromise<T> = T extends Promise<infer t> ? RemovePromise<t> : T
