import vTalk from './vtalk';

/* istanbul ignore next */
vTalk.install = function (Vue) {
  Vue.component(vTalk.name, vTalk);
};

export default vTalk;