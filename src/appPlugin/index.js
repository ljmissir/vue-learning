const components = require.context('../components', true, /\.vue$/);

const formatCompName = (str) => {
    if (!str) return 'HelloWorld';
    const list = str.split('/');
    const last = list[list.length - 1];
    if (last.indexOf('index') > -1) {
        return list[list.length - 2];
    }
    return list[list.length - 1].replace(/\.vue$/, '');
}

export default {
    install (Vue) {
        components.keys().forEach(key => {
            Vue.component(formatCompName(key), components(key).default)
        })
    }
}