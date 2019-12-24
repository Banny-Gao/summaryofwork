import magicModal from './magicModal'

magicModal.install = function (Vue) {
  Vue.component(magicModal.name, magicModal);
};

export default magicModal