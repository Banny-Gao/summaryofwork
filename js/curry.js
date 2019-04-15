/**
 * 
 * @param {function} func
 * @returns {function} curry function 
 */
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

const _curry = (fn, arr = []) => (...args) => {
  return (
    arg => arg.length === fn.length ?
    fn(...arg) :
    _curry(fn, arg)
  )([...arr, ...args])
}