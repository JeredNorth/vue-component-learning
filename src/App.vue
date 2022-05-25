<template>
  <q-layout view="lHh Lpr lFf" class="bg-primary">
    <q-page-container>
      <Home />
    </q-page-container>
  </q-layout>
</template>

<script>
import Home from './pages/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },

  setup() {

  },
};
</script>
