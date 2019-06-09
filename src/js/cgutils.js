/* eslint-disable no-param-reassign */
import { ethers } from 'ethers';

export default {
  install: (Vue) => {
    Vue.prototype.$_cgutils = {
      // formatEthersTx is used to prepare transactions received from the MultiBaas API
      // for submission on the frontend by ethers.js
      // This helper renames the gas field to gasLimit, and deletes some fields that
      // prevent ethers.js from being able to submit the transaction
      formatEthersTx(txFromAPI) {
        const tx = JSON.parse(JSON.stringify(txFromAPI));
        tx.gasLimit = tx.gas;
        delete tx.gas;
        delete tx.from;
        delete tx.hash;
        return tx;
      },
      connectToWeb3(browserHook) {
        const result = {
          provider: null,
          web3Available: false,
        };

        if (typeof browserHook !== 'undefined') {
          // Use Mist/MetaMask's provider
          result.provider = new ethers.providers.Web3Provider(browserHook.currentProvider);
          result.web3Available = true;
        } else {
          console.error('Please set up your MetaMask network.');
          console.error('Read the instructions in MultiBaas > Account > Connecting to Geth');
        }
        return result;
      },
      // Get the selected address from Metamask or web3 provider
      // Returns null if not found
      async getActiveAccount() {
        try {
          const response = await this.web3.eth.getAccounts();
          return response[0];
        } catch (e) {
          console.error('Unable to get wallet address:', e);
        }
        return null;
      },
    };
  },
};
