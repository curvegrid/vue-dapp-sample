<template>
  <div id="app">
    <div>{{ response }} </div>
    <button @click="getOwner">Get Zombie Factory Owner</button>
  </div>
</template>

<script>
import axios from 'axios';
import axiosCookieJarSupport from '@3846masa/axios-cookiejar-support';
import tough from 'tough-cookie';

axiosCookieJarSupport(axios);

const cookieJar = new tough.CookieJar();

axios.defaults.jar = cookieJar;
axios.defaults.withCredentials = true;

const baseURL = 'https://localhost:8080/';
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
  created() {
    this.login();
  },
  methods: {
    async login() {
      try {
        await axios.post(`${baseURL}api/v0/login`,
          {
            email: apiUser,
            password: apiPassword,
          });
      } catch (err) {
        console.log(err);
      }
    },
    async getOwner() {
      try {
        this.response = await axios.get(`${baseURL}api/v0/chains/ethereum/contracts/zombiefactory/addresses/zombiefactory/owner`);
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
