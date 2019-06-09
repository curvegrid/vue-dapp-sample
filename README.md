# vue-dapp-sample

## Project configuration
In `vue.config.js`, update the value of `instanceURL` to point your MultiBaas instance. Note that the URL must begin with `https://` and end with `/`

In `App.vue`, set the values of `apiUser` and `apiPassword` to your MultiBaas username and password respectively.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

After serving the app, please make sure that the URL the application is served is equal to the value of `baseURL` in `App.vue`

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
