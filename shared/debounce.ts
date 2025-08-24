function debounce<T extends (...args: unknown[]) => void>(func: T, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(func.bind(this, args), delay)
  }
}
