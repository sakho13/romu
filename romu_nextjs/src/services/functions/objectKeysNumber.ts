export function objectKeysNumber<O extends {}>(obj: O) {
  return Object.keys(obj).map(Number) as [keyof O]
}
