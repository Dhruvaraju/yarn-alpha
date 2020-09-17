# yarn-alpha

Yarn dependency management learning log

## What is yarn?

- A package manager
- Yarn provides the below mentioned advantages when compared to other package managers

  - **Offline Caching**: Once installed from npm from next time onwards these will be installed from local.
  - **Deterministic** : packages will be installed in same way if you are using same version of yarn.
  - **Network Performance**: network requests from Yarn are queued to maximize network utilization
  - **Network resilience**: if one request fails, it does not stop the whole install. Previously with NPM, if you couldn't get one package you were trying to install, the whole install would fail
  - **Flat node modules**: This keeps mismatching package versions from creating duplicates in the node modules and hoists packages to the top of the node modules, reducing the size of your total dependencies

  > Yarn and npm has different syntax, example npm install is equal to yarn add

  ### Yarn Features:

  #### Offline mirroring

  - Loads the dependency files to a local folder stored with tar extension which will be used not only for one project but for multiple projects.
  - This increases faster inter team installs and no access to internet after the first time.

  #### Workspaces:

  - Mono repo integration which is a concept originated from facebook. small projects are groups together to form a monorepo. Each project is called as a workspace.
  - Shared dependencies are kept in main directory called as monorepo all other projects can be invoked individually.

#### Auto-merging lock files

- Better version control integration and easy to resolve conflicts
  > yarn supports 2 factor authentication

> Npx is a command which ships with npm used to invoke other functionalities or package binaries like npx grunt.

## Installing yarn

- Yarn requires node js installation
- to install yarn globally `npm install -g yarn` or you can install through an msi
- `yarn -v` to check version of yarn installed.

## Creating a yarn project

- To make a yarn project navigate to project folder and use `yarn init`
- yarn will ask a set of questions, the answers you give will be taken into package.json

```
yarn init v1.22.5
question name (additionapp):
question version (1.0.0):
question description: adding two numbers
question entry point (index.js):
question repository url:
question author: dhruva
question license (MIT):
question private: No
```

- package.json entry

```
{
  "name": "additionapp",
  "version": "1.0.0",
  "description": "adding two numbers",
  "main": "index.js",
  "author": "dhruva",
  "license": "MIT",
  "private": false
}
```

- to add a dev dependency use the command. `yarn add --dev <<package-name>>` like ` yarn add --dev jest`
- In the addition-app we will be using ava for testing so install it as dev dependency `yarn add --dev ava`. Package.json will be updated with ava.
- A yarn lock file will also be generated. Yarn lock file will provide information on package you use, version number the url package downloaded from, hash code to verify integrity and dependencies

```
ava@^3.12.1:
  version "3.12.1"
  resolved "https://registry.yarnpkg.com/ava/-/ava-3.12.1.tgz#0181b5ca10d178539a0d503e0fc9244146303717"
  integrity sha512-cS41+X+UfrcPed+CIgne/YV/6eWxaUjHEPH+W8WvNSqWTWku5YitjZGE5cMHFuJxwHELdR541xTBRn8Uwi4PSw==
  dependencies:
    "@concordance/react" "^2.0.0"
    acorn "^8.0.1"
    acorn-walk "^8.0.0"
    ansi-styles "^4.2.1"
```

- add a .gitignore file and make an entry for node_modules so git will not track your node modules folder.

## Starting with tests

- create a test folder, create a file named as index.test.js
- update package.js under main add a scripts section. Add ava as test invocation.

```
"scripts": {
  "test": "ava"
}
```

- To invoke tests use command `yarn test`
- Add the following code in a file index.js in the src folder of your project

```
export default function addition(el01, el02) {
    return +el01+el02;
}
```

- We can write a simple test as mentioned below, in the test folder index.test.js

```
const test = require('ava');
const addition = require('../src/index');

test('Check addition is working',(element => {
   element.is(addition(2,3),5);
}
  ));
```

> when we run this it will through an exception, because we are using default nodejs syntax in test file and default javascript function export in index.js to resolve this we need to use babel.

#### adding babel to the current project

- install babel-core, babel-plugin-helpers babel-preset-env as dev dependencies

```
yarn add --dev babel-core babel-plugin-external-helpers babel-preset-env
```

- Add the following plugin for installing the babel plugin to initiate tests

```
yarn add --dev @ava/babel-preset-stage-4
```

> These will update the package.json file with the plugins that we added

#### Configuring babel using babelrc
- Add the following in babelrc file to define test and build perspectives
```
{
  "env": {
    "test": {
      "presets": ["env"]
    },
    "build": {
      "presets": [["env", { "modules": false }]],
      "plugins": ["external-helpers"]
    }
  }
}

```
- Add the following in the package.json file for configuring tests and ava
```
"scripts": {
    "test": "BABEL_ENV=test ava" // used for defining babel environment and invoke ava
  },
  "ava": {
    "files": [
      "test/*.js" // specifying where ava can get test files
    ],
    "source": [
      "src/*.{js}", // where to get source files
      "!dist/**/*" //what folder that need to be ignored
    ],
    "tap": true,
    "require": "babel-register",
    "babel": "inherit"
  },
```
