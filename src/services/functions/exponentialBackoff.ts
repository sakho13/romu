export function exponentialBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 5,
  baseDelayMs = 1000,
  jitter = 0.5,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const attempt = (n: number) => {
      fn()
        .then(resolve)
        .catch((err) => {
          if (n === 0) {
            reject(err)
          } else {
            const delay = baseDelayMs * 2 ** (maxRetries - n)
            const randomDelay = delay * (1 + (Math.random() * 2 - 1) * jitter)
            setTimeout(() => attempt(n - 1), randomDelay)
          }
        })
    }
    attempt(maxRetries)
  })
}
