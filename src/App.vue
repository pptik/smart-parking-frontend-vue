<template>
  <div id="app">
    <b-navbar toggleable type="light" variant="light">
        <b-navbar-brand to="/">Smart Parking</b-navbar-brand>
        <b-nav pills left>
          <b-nav-item to="/">
           Dashboard
          </b-nav-item>
          <b-nav-item to="users">
           Users
          </b-nav-item>
          <b-nav-item to="logs">
           Logs
          </b-nav-item>
          <b-nav-item to="register">
           Register
          </b-nav-item>
        </b-nav>
    </b-navbar>
    <router-view/>
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
