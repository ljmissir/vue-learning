<template>
    <div class="notice-wrapper" v-if="isShow">
        <p class="title">{{title}}</p>
        <p class="content">{{content}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: ''
            },
            content: {
                type: String,
                default: ''
            },
            duration: {
                type: Number,
                default: 1000
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
        text-align: center;
        left: 50%;
        top: 0;
        width: 200px;
        /* border: 1px solid #ccc; */
        margin-left: -100px;
        background: #fff;
        z-index: 100;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        transition: opacity .3s,transform .3s,left .3s,right .3s,top .4s,bottom .3s;
        border-radius: 8px;
    }
</style>