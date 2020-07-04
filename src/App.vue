<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
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
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
