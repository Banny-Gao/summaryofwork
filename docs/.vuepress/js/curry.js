export const curry = (func, ...arity) => (...args) => (
    (...values) => values.length === func.length ?
        func(...values) :
        curry(func, ...values)
)(...arity, ...args)