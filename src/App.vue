<template>
  <nav>
    <router-link to="/token">Token (P1)</router-link> |
    <router-link to="/vehiculos">Vehículos (P2, P3, P4)</router-link> | 
    <a href="#" @click.prevent="logout">Logout</a>
  </nav>
  <router-view/>
</template>

<script>
import { AuthorizationToken } from "./components/AuthorizationToken";

export default {
  methods: {
    logout() {
      AuthorizationToken.logout();
      this.$router.push('/token');
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
