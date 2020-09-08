import G2Basic from './G2Basic'
import G2CloudWord from './G2CloudWord'
import G2Treemap from './G2Treemap'

G2Basic.install = (Vue) => Vue.component(G2Basic.name, G2Basic)
G2CloudWord.install = (Vue) => Vue.component(G2CloudWord.name, G2CloudWord)
G2Treemap.install = (Vue) => Vue.component(G2Treemap.name, G2Treemap)

export {
  G2Basic,
  G2CloudWord,
}