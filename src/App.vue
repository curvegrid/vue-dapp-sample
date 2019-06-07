<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="doThing">Click me</button>
  </div>
</template>

<script>
import axios from 'axios';
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support';
import tough from 'tough-cookie';
import HelloWorld from './components/HelloWorld.vue';

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const baseURL = 'http://localhost:8081/';
const apiUser = '';
const apiPassword = '';

export default {
  name: 'app',
  components: {
    HelloWorld,
  },
  methods: {
    async doThing() {
      console.log('hin');
      try {
        let result = await axios.post(`${baseURL}api/v0/login`,
          {
            email: apiUser,
            password: apiPassword,
          },
          {
            jar: cookieJar, // tough.CookieJar or boolean
            withCredentials: true, // If true, send cookie stored in jar
          });
        console.log(result);
        result = await axios.get(`${baseURL}api/v0/chains/ethereum/contracts/zombiefactory/addresses/zombiefactory/owner`,
          {
            jar: cookieJar,
            withCredentials: true,
          });
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
