export function comTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined

  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('Tempo esgotado')), ms)
  })

  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}