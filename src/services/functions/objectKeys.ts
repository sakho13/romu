export function objectKeys<O extends {}>(obj: O) {
  return Object.keys(obj) as [keyof O]
}
