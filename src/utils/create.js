import Vue from 'vue';
import Notice from '@/components/Notice';

function create (component, props) {
    // 通过Vue.extend()方法生成一个组件实例
    const Consr = Vue.extend(component);
    const comp = new Consr({propsData: props});
    // vdom转为真实dom
    comp.$mount();
    // 追加到body后面
    document.body.appendChild(comp.$el);
    // 移除dom节点
    comp.remove = function () {
        document.body.removeChild(comp.$el);
        comp.$destory();
    }
    return comp;
}

export default {
    install (Vue) {
        Vue.prototype.$notice = function (options) {
            const comp = create(Notice, options);
            console.log(comp, 78)
            comp.show();
            return comp;
        }
    }
}