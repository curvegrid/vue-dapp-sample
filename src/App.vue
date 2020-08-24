<template>
  <div id="app">
    <button @click="getTotalSupply">Get Total MltiToken Supply</button>
    <form v-on:submit.prevent>
      <p>
        <input type="text" placeholder="Number of Tokens to Mint" v-model="tokenAmount" />
      </p>
      <p>
        <button prevent="submit" @click="mintTokens">Mint Tokens</button>
      </p>
    </form>
    <hr />
    <pre>{{ response | prettyJSON }}</pre>
  </div>
</template>

<script>
// [REQUIRED] Server URL
const BASE_URL = '';

// [REQUIRED] Server API key
const API_KEY = '';

// JSON RPC needed for UI test
const JSON_RPC = '';
const SIGNER_PRIVATE_KEY = ''; //NEVER USE A REAL ACCOUNT HERE! This is meant only for throw-away test accounts on test networks.

// The deployed contract's address, or the label you assigned it in MultiBaas
// [CAN BE REPLACED]
const CONTRACT_LABEL_OR_ADDRESS = 'mltitoken';

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
      response: '',
      tokenAmount: '10',
      axios: null,
    };
  },
  filters: {
    prettyJSON(value) {
      return JSON.stringify(value, null, 2);
    },
  },
  async created() {
    // If MetaMask's privacy mode is enabled, we must get the user's permission
    // in order to be able to access their signers
    if (window.ethereum != null) { // true if user is using MetaMask
      await window.ethereum.enable();
    }

    this.connectToWeb3();
    this.axios = this.$root.$_cgutils.createAxiosInstance(BASE_URL, API_KEY);
  },
  methods: {
    // We must init the web3 provider so that we can sign transactions
    connectToWeb3() {
      const web3Config = this.$root.$_cgutils.connectToWeb3(
        window.web3,
        JSON_RPC,
        SIGNER_PRIVATE_KEY,
      );
      this.$root.$_web3 = web3Config.provider;
      this.$root.$_web3Available = web3Config.web3Available;
    },
    // Get the Eth Address currently selected in MetaMask
    async getActiveAccount() {
      const accounts = await this.$root.$_web3.listAccounts();
      return accounts[0];
    },
    async getTotalSupply() {
      try {
        const { data } = await this.axios.post(
          `/api/v0/chains/ethereum/addresses/${CONTRACT_LABEL_OR_ADDRESS}/contracts/mltitoken/methods/totalSupply`,
        );
        this.response = data;
      } catch (err) {
        console.log(err);
      }
    },
    async mintTokens() {
      try {
        const account = await this.getActiveAccount();
        const jsonBody = {
          args: [`${this.tokenAmount}`],
          from: account,
          signer: account,
        };

        const {
          data: {
            result: { tx, submitted },
          },
        } = await this.axios.post(
          `/api/v0/chains/ethereum/addresses/${CONTRACT_LABEL_OR_ADDRESS}/contracts/mltitoken/methods/mint`,
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
