# yarn-alpha

Yarn dependency management learning log

## What is yarn?

- A package manager
- Yarn provides the below mentioned advantages when compared to other package managers

  - **Offline Caching**: Once installed from npm from next time onwards these will be installed from local.
  - **Deterministic** : packages will be installed in same way if you are using same version of yarn.
  - **Network Performance**: network requests from Yarn are queued to maximize network utilization
  - **Network resilience**: if one request fails, it does not stop the whole install. Previously with NPM, if you couldn't get one package you were trying to install, the whole install would fail
  - **Flat node modules**:  This keeps mismatching package versions from creating duplicates in the node modules and hoists packages to the top of the node modules, reducing the size of your total dependencies

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
- to install yarn globally ``` npm install -g yarn ``` or you can install through an msi
- ``` yarn -v ``` to check version of yarn installed.
