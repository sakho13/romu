export function objectKeysNumber<O extends object>(obj: O) {
  return Object.keys(obj).map(Number) as [keyof O]
}
