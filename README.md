# Restore

Redux-based store with adapters (defaults to HTTP)

### Install

```sh
npm i webpack typings typescript -g

npm install
npm test
```

Then it will automatically run the tests in Chrome

To run tests with a watcher (for development)

```sh
npm run test-watch
```

Coverage

```sh
open reports/coverage/index.html
```

Creating Docs
```sh
typedoc --ignoreCompilerErrors -m commonjs --out ./doc/ src
```