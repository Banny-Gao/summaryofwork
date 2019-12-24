export const objectConcat = (Obj) => {
  Obj = Obj || Object.prototype
  Object.defineProperty(Obj, 'cancat', {
    enumerable: true,
    configurable: true,
    value(...args) {
      const result = args.reduce((result, item) => {
        return {
          ...result,
          ...item
        }
      }, {})
      Object.assign(this, result)
      return this
    }
  })
}

export const install = (target) => {
  objectConcat(target)
}