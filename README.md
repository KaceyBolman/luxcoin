# lux

Lux - cryptocurrency wallet

## Automated build

### CI/dev build scripts

Platform-specific build scripts facilitate building Lux the way it is built
by the IOHK CI:

   - `scripts/build-installer-unix.sh     <LUX-VERSION> <CARDANO-BRANCH> [OPTIONS..]`
      - where OS is either `linux` or `osx`
      - facilitates installer upload to S3 via `--upload-s3`
   - `scripts/build-installer-windows.bat <LUX-VERSION> <CARDANO-BRANCH>`

The result can be found at:
   - on OS X:    `${BUILD}/installers/dist/Lux-installer-*.pkg`
   - on WIndows: `${BUILD}/installers/lux-*-installer.exe`

### One-click build-fresh-lux scripts

These rely on the scripts from the previous section, but also go to a certain
trouble to ensure that dependencies are installed, and even check out a fresh
version of Lux from the specifid branch.

These are intended to be used by developers in a "clean rebuild" scenario, to
facilitate validation.

Dependencies:
   - on OS X:    `git`
   - on Windows: `Node.js`, `7zip`

Location:
   - on OS X:    https://github.com/input-output-hk/lux/blob/master/scripts/osx-build-fresh-lux.sh
   - on Windows: https://github.com/input-output-hk/lux/blob/master/scripts/windows-build-fresh-lux.bat

Invocation:
   ```shell
   {osx,windows}-build-fresh-lux.{sh,bat} [BRANCH] [GITHUB-USER] [OPTIONS...]
   ```
   ..where `BRANCH` defaults to the current release branch, and `GITHUB-USER`
   defaults to `input-output-hk`.

   The remaining `OPTIONS` are passed as-is to the respective build scripts.

## Stepwise build

### Install Node.js dependencies.

```bash
$ npm install
```

## Development

run with one command:

```bash
$ npm run dev
```

Or run these two commands __simultaneously__ in different console tabs.

```bash
$ npm run hot-server
$ npm run start-hot
```

*Note: requires a node version >= 4 and an npm version >= 3. This project
defaults to 6.x*

### Development - with Cardano Wallet (lux-bridge)

Build and run lux-bridge [using instructions in the repo](https://github.com/input-output-hk/pos-haskell-prototype/tree/master/lux)

Symlink the npm package in the subfolder `pos-haskell-prototype/lux`:
* `npm link` (inside the lux sub folder of the Cardano client)
* `npm link lux-client-api` (inside this lux frontend app)

Run with `npm run dev`

### Development - network options

There are four different network options you can run Deadalus in: `mainnet`, `testnet` and `development` (default).
To set desired network option use `NETWORK` environment variable:

```bash
$ NETWORK=testnet npm run dev
```

### Testing

You can run the test suite in two different modes:

**One-time run:**
For running tests once using the application in prod mode (which is fast)
instead of dev with webpack hot-reload server (which is slow).

Execute this once before running the tests (which creates the `dist/bundle.js`):
```bash
$ npm run build
``` 

After that, execute this to run the tests:

```bash
$ npm run test
```

**Watch & Rerun on file changes:**
For development purposes run the tests continuously in watch mode which will re-run tests when source code changes.

Execute:
```bash
$ npm run hot-server
```

and then this:
```bash
$ npm run test-watch
```

You can find more details regarding tests setup within [Running Deadalus acceptance tests](https://github.com/input-output-hk/lux/blob/master/features/README.md) README file.

### CSS Modules

This boilerplate out of the box is configured to use [css-modules](https://github.com/css-modules/css-modules).

All `.css` file extensions will use css-modules unless it has `.global.css`.

If you need global styles, stylesheets with `.global.css` will not go through the
css-modules loader. e.g. `app.global.css`

### Externals

If you use any 3rd party libraries which can't or won't be built with webpack, you must list them in your `webpack.config.base.js`：

```javascript
externals: [
  // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
]
```

For a common example, to install Bootstrap, `npm i --save bootstrap` and link them in the head of app.html

```html
<link rel="stylesheet" href="../node_modules/bootstrap/dist/css/bootstrap.css" />
<link rel="image/svg+xml" href="../node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.eot" />
...
```

Make sure to list bootstrap in externals in `webpack.config.base.js` or the app won't include them in the package:
```js
externals: ['bootstrap']
```

## Packaging

```bash
$ npm run package
```

To package apps for all platforms:

```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

### Options

- --name, -n: Application name (default: ElectronReact)
- --version, -v: Electron version (default: latest version)
- --asar, -a: [asar](https://github.com/atom/asar) support (default: false)
- --icon, -i: Application icon
- --all: pack for all platforms

Use `electron-packager` to pack your app with `--all` options for darwin (osx), linux and win32 (windows) platform. After build, you will find them in `release` folder. Otherwise, you will only find one for your os.
