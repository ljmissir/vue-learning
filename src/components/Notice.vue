<template>
    <div class="notice-wrapper" :class="type" v-if="isShow">
        <p class="message">{{message}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            message: {
                type: String,
                default: ''
            },
            duration: {
                type: Number,
                default: 3000
            },
            type: {
                type: String,
                default: 'info'
            }
        },
        data () {
            return {
                isShow: false
            }
        },
        methods: {
            show () {
                this.isShow = true;
                setTimeout(() => {
                    this.hide();
                }, this.duration)
            },
            hide () {
                this.isShow = false
            }
        }
    }
</script>

<style lang="css">
    .notice-wrapper {
        position: fixed;
        text-align: left;
        padding-left: 20px;
        left: 50%;
        top: 20px;
        width: 380px;
        border-width: 1px;
        border-style: solid;
        margin-left: -190px;
        background: #fff;
        z-index: 100;
        /* box-shadow: 0 2px 12px 0 rgba(0,0,0,.1); */
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
        border-radius: 4px;
    }
    .notice-wrapper.success {
        background-color: #f0f9eb;
        border-color: #e1f3d8;
        color: #67c23a;
    }
    .notice-wrapper.error {
        background: #fde2e2;
        border-color: #fde2e2;
        color: #f56c6c;
    }
    .notice-wrapper p {
        line-height: 40px;
        margin: 0;
    }
    /* .notice-wrapper p.success {
        color: #67c23a;
    }
    .notice-wrapper p.error {
        color: #f56c6c;
    } */
</style>