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

These tests will run against the above configured server and deployed MltiToken contract.

You **must stop any currently running server**, i.e. Ctrl-C out of `yarn run serve`.

You can then run the tests with the following command:

```sh
yarn run test
```