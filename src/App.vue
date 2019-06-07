<template>
  <div id="app">
    <button @click="doThing">Click me</button>
    <div>{{ response }} </div>
  </div>
</template>

<script>
import axios from 'axios';
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support';
import tough from 'tough-cookie';

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

const baseURL = 'http://localhost:8081/';
const apiUser = '';
const apiPassword = '';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      response: '',
    };
  },
  methods: {
    async doThing() {
      try {
        this.response = await axios.post(`${baseURL}api/v0/login`,
          {
            email: apiUser,
            password: apiPassword,
          },
          {
            jar: cookieJar, // tough.CookieJar or boolean
            withCredentials: true, // If true, send cookie stored in jar
          });
        this.response = await axios.get(`${baseURL}api/v0/chains/ethereum/contracts/zombiefactory/addresses/zombiefactory/owner`,
          {
            jar: cookieJar,
            withCredentials: true,
          });
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
