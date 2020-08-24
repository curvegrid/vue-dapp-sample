# Vue DApp Sample

## MultiBaas configuration

1. **Deployment**
    - You will need to [create a MultiBaas deployment](https://www.curvegrid.com/docs/3-0-getting-started-creating-a-multibaas-deployment/) or have an existing deployment to use this sample.
2. **API Key**
    - You will also need to [provision an API key](https://www.curvegrid.com/docs/5-1-generate-api-keys/) with membership in the `DApp User` group.
3. **Mlti Token Contract**
    - You will need to [deploy a `Mlti Token` contract](https://www.curvegrid.com/docs/4-3-deploy-a-smart-contract/) using the label `mltitoken`.
4. **CORS Configuration**
    - Finally, you will need to update your CORS settings by going to `Admin` then `CORS Domains` and setting up the domain of the sample app. If you are running locally this will be `http://localhost:8080` by default.

After you have configured your deployment and smart contract, please fill out the required parameters below in `App.vue`:

- `BASE_URL`
- `API_KEY`

## Project setup

```sh
yarn install
```

### Compile and hot-reload for development

```sh
yarn run serve
```

### Compile and minify for production

```sh
yarn run build
```

### Lint and fix files

```sh
yarn run lint
```

## UI tests

**CAUTION**: These tests will run against the above configured server and deployed MltiToken contract and cause new tokens to be minted. **Do not run these tests on a production smart contract.**

In order to run the tests you will need a JSON RPC URL and a private key.

1. **JSON RPC URL**
    - You can use the URL of your web3 provider or, if you are using a special network such as Curvegrid's private network, you can get a URL from your MultiBaas deployment by going to `Admin` then `API Keys` and then generating a new key with `Use this key as a public Web3 key` selected.
2. **Private Key**
    - You will also need the private key of the owner of the MltiToken contract. You should be able to export this from your web3 browser or wallet. **CAUTION: YOU WILL BE STORING AN EXPOSED PRIVATE KEY IN THE SOURCE CODE! NEVER DO THIS WITH A REAL ACCOUNT!**

When you are ready, please configure the following parameters in `App.vue`:

- `JSON_RPC`
- `SIGNER_PRIVATE_KEY`

You **must stop any currently running server**, i.e. Ctrl-C out of `yarn run serve`.

You can then run the tests with the following command:

```sh
yarn run test
```