export const generatorRun = (genFunc) => {
    return new Promise((resolve, reject) => {
        const gen = genFunc()
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
            return gen.next(undefined)
        })
    })
}
