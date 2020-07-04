<template>
  <div class="about">
    <h1>Form表单实现</h1>
    <k-form :model="model" :rules="rules" ref="loginForm">
      <k-form-item label='用户名' prop='username'>
        <k-input v-model="model.username" placeholder="请输入用户名" :disabled="false"></k-input>
      </k-form-item>
      <k-form-item label='密码' prop='password'>
        <k-input v-model="model.password" placeholder="请输入密码" type='password' :disabled="false"></k-input>
      </k-form-item>
      <k-form-item>
        <button @click="login">登录</button>
      </k-form-item>
    </k-form>
  </div>
</template>

<script>
  import KInput from '@/components/Form/KInput';
  import KFormItem from '@/components/Form/KFormItem';
  import KForm from '@/components/Form/KForm';
  export default {
    provide () {
      return {
        // 把表单实例注入给后代组件
        form: this
      }
    },
    data () {
      return {
        model: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            {required: true, message: '请输入用户名'}
          ],
          password: [
            {required: true, message: '请输入密码'}
          ]
        }
      }
    },
    components: {
      KInput,
      KFormItem,
      KForm
    },
    methods: {
      login () {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.$notice({
              title: '温馨提示',
              content: '校验通过'
            })
          } else {
            this.$notice({
              title: '温馨提示',
              content: '校验失败'
            })
          }
        })
      }
    }
  }
</script>
