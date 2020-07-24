<template>
  <div class="home">
    <svg-icon iconClass="wx" style="font-size: 30px; color: green;"/>
    <k-input placeholder="请输入用户名"></k-input>
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
