import debounce from "./_.debounce"

const isObject = (value) => {
  const type = typeof value
  return value != null && (type == "object" || type == "function")
}

export default function throttle(func, wait = 0, options) {
  let leading = true,
    trailing = true

  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading
    trailing = "trailing" in options ? !!options.trailing : trailing
  }

  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  })
}
