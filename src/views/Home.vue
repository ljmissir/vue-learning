<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <button @click="$store.commit('add', 1)">＋1</button>
      <span>{{$store.state.counter}}</span>
    </div>
    <br>
    <div>
      <button @click="$store.dispatch('reduce', 1)">-1</button>
      <span>{{$store.state.counter}}</span>
    </div>
    <p>double：{{$store.getters.doubleCount}}</p>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
