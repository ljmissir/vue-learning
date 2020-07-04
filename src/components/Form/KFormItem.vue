<template>
    <div class="k-form-item">
        <!-- 表单label -->
        <label v-if='label'>{{label}}</label>
        <!-- slot插槽 -->
        <slot></slot>
        <!-- 错误提示信息 -->
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
    import Schma from 'async-validator';
    export default {
        inject: ['form'],
        props: {
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                error: ''
            }
        },
        mounted () {
            this.$on('validate', () => {
                this.validate();
            })
            console.log(this.form, 89)
        },
        methods: {
            // formitem表单项校验
            validate () {
                console.log('触发校验');
                const rules = this.form.rules[this.prop];
                const value = this.form.model[this.prop];
                const schma = new Schma({[this.prop]: rules});
                return schma.validate({[this.prop]: value}, errors => {
                    if (errors) {
                        this.error = errors[0].message;
                    } else {
                        this.error = ''
                    }
                })
            }
        }
    }
</script>

<style lang="css">
    .error {
        color: red;
    }
</style>