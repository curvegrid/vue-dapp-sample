<template>
  <div id="app">
    <div>{{ response }} </div>
    <button @click="getTotalSupply">Get Total MltiToken Supply</button>
    <form v-on:submit.prevent>
      <input type="text" placeholder="Number of Tokens to Mint" v-model="tokenAmount" />
      <button prevent="submit" @click="mintTokens">Mint Tokens</button>
    </form>
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
const ETH_SIGNER = ''; // this is the address in MetaMask you will use to sign the transaction
const CONTRACT_LABEL_OR_ADDRESS = 'mltitoken'; // this is the deployed contract's address, or the label you gave it
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      response: '',
      tokenAmount: '',
    };
  },
  async created() {
    // If MetaMask's privacy mode is enabled, we must get the user's permission
    // in order to be able to access their signers
    if (window.ethereum != null) { // true if user is using MetaMask
      await window.ethereum.enable();
    }

    this.connectToWeb3();
    this.login();
  },
  methods: {
    // We must init the web3 provider so that we can sign transactions
    connectToWeb3() {
      const web3Config = this.$root.$_cgutils.connectToWeb3(window.web3);
      this.$root.$_web3 = web3Config.provider;
      this.$root.$_web3Available = web3Config.web3Available;
    },
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
    async getTotalSupply() {
      try {
        this.response = await axios.get(`${baseURL}api/v0/chains/ethereum/contracts/mltitoken/addresses/${CONTRACT_LABEL_OR_ADDRESS}/totalSupply`);
      } catch (err) {
        console.log(err);
      }
    },
    async mintTokens() {
      try {
        const jsonBody = {
          args: {
            _amount: this.tokenAmount,
          },
          from: ETH_SIGNER,
          signer: ETH_SIGNER,
        };

        const {
          data: {
            result: { tx, submitted },
          },
        } = await axios.post(
          `${baseURL}api/v0/chains/ethereum/contracts/mltitoken/addresses/${CONTRACT_LABEL_OR_ADDRESS}/mint`,
          jsonBody,
        );

        if (!submitted) {
          // Get the signer from MetaMask
          const signer = this.$root.$_web3.getSigner(tx.from);
          // Format the transaction so that ethers.js can sign it
          const ethersTx = this.$root.$_cgutils.formatEthersTx(tx);
          // Submit the transaction to the blockchain
          const txResponse = await signer.sendTransaction(ethersTx);
          this.response = txResponse;
        }
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
