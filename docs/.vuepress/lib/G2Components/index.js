import G2Basic from './G2Basic'
import G2CloudWord from './G2CloudWord'

G2Basic.install = (Vue) => Vue.component(G2Basic.name, G2Basic)
G2CloudWord.install = (Vue) => Vue.component(G2CloudWord.name, G2CloudWord)

export {
  G2Basic,
  G2CloudWord,
}