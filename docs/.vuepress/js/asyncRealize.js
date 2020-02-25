export const generatorRun = (genFunc) => {
    return new Promise((resolve, reject) => {
        const gen = genFunc()
        const step = (key, arg) => {
            let next, value
            try {
                next = gen[key](arg)
                value = next.value
            } catch (error) {
                return reject(error)
            }
            if (next.done) {
                resolve(value)
            } else {
                return Promise.resolve(value).then((value) => {
                    step('next', value)
                }, (error) => {
                    step('throw', error)
                })
            }
        }
        return step('next')
    })
}
