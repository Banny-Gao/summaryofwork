/** 
 * @name run
 * @param genF generator function
 * @return promise
 */

const run = (genF) => {
  return new Promise((resolve, reject) => {
    const gen = genF()
    const step = (nextF) => {
      let next
      try {
        next = nextF()
      } catch (e) {
        return reject(e)
      }
      if (next.done) {
        return resolve(next.value)
      }
      Promise.resolve(next.value).then((v) => {
        step(() => {
          return gen.next(v)
        })
      }, (e) => {
        step(() => {
          return gen.throw(e)
        })
      })
    }
    step(() => {
      return gen.next(undefined);
    })
  })
}

const asyncFun = () => {
  return run(function* () {
    const a = yield Promise.resolve(1)
    console.log(a)
    const b = yield new Promise((resolve) => {
      setTimeout(() => {
        resolve(2)
      }, 2000)
    })
    console.log(b)
    const c = yield 3
    console.log(c)
    return a + b + c
  })
}

asyncFun()