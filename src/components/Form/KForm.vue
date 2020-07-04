<template>
    <div class="k-form">
        <slot></slot>
    </div>
</template>

<script>
    export default {
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
        methods: {
            // formitem表单项校验
            validate (cb) {
                console.log('触发校验');
                const tasks = this.$children.filter(item => item.prop).map(item => item.validate());
                Promise.all(tasks)
                    .then(() => cb(true))
                    .catch(() => cb(false))
            }
        }
    }
</script>