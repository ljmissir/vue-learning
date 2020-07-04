<template>
    <div class="k-form">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        componentName: 'KForm',
        props: {
            model: {
                type: Object,
                required: true
            },
            rules: {
                type: Object
            }
        },
        data () {
            return {
                error: ''
            }
        },
        created () {
            this.fields = []
            this.$on('kkb.form.addField', item => {
                this.fields.push(item);
            })
            console.log(this.fields, 789)
        },
        methods: {
            // formitem表单项校验
            validate (cb) {
                console.log('触发校验');
                // const tasks = this.$children.filter(item => item.prop).map(item => item.validate());
                // 和this.$children解耦
                const tasks = this.fields.map(item => item.validate());
                Promise.all(tasks)
                    .then(() => cb(true))
                    .catch(() => cb(false))
            }
        }
    }
</script>