<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>
<template>
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="nav navbar-nav">
      <router-link :to="{ name: 'autores' }" class="nav-link">Autores </router-link>
      <router-link :to="{ name: 'editoriales' }" class="nav-link">Editoriales</router-link>
      <router-link :to="{ name: 'libros' }" class="nav-link">Libros</router-link>
    </div>
  </nav>
</template>