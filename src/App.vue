<template>
  <q-layout view="lHh Lpr lFf" class="bg-dark">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/reviews">Reviews</router-link>
    </div>
    <q-page-container>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #8081ad;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
