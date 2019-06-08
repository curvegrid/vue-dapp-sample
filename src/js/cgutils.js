/* eslint-disable no-param-reassign */
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
    };
  },
};
