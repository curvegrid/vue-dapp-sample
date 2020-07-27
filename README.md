# Vue DApp Sample

## Project configuration

After [deploying MultiBaas instance](https://www.curvegrid.com/docs/3-0-getting-started-creating-a-multibaas-deployment/), please make sure fill out all config below in `App.vue`:

- `BASE_URL`
- `API_KEY`
- `JSON_RPC`
- `SIGNER_PRIVATE_KEY`

For this sample, you also need to deploy `Mlti Token` with a label as `mltitoken`. If you want to use a different label then you need to replace a config below as well in `App.vue`:

- `CONTRACT_LABEL_OR_ADDRESS`

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn run serve
```

### Compiles and minifies for production

```sh
yarn run build
```

### Lints and fixes files

```sh
yarn run lint
```

### Run your UI tests

```sh
yarn run test
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
