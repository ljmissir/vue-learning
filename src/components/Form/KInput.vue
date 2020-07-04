<template>
    <div class="k-input">
        <!-- v-bind="$attrs"，可以把父组件的非props属性依次解析 -->
        <input :type="type" :value="value" :disabled="disabled" @input="onInput" v-bind="$attrs">
    </div>
</template>

<script>
    import emitter from '@/mixins/emitter';
    export default {
        mixins: [emitter],
        // inheritAttrs: false可以把attrs继承过来的属性去掉，只保留子组件自身的属性
        inheritAttrs: false,
        props: {
            type: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            onInput (e) {
                this.$emit('input', e.target.value);
                // 通过父组件来实时触发校验
                // this.$parent.$emit('validate');
                // 降低耦合度
                this.dispatch('KFormItem', 'validate');
            }
        }
    }
</script>

<style lang="css">
    .k-input {
        margin-bottom: 15px;
    }
    .k-input input {
        padding: 8px 12px;
        width: 100%;
    }
</style>