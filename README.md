# PR Deploy Status Github Action
Github Action to fetch and output the last PR deploy status to an environment 

## Inputs

Name | Description | Required
--- | --- | ---
`repository` | Git Repository name (owner/repository name) | `true`
`environment` | Pull Request deployment environment name | `true`

## Example Usage

```
jobs:
  get-pr-deploy-status:
    runs-on: ubuntu-latest
    steps:
    - name: Output PR last deploy status
        uses: envoy/pr-deploy-status-action@v1.0.0
        with:
          # Repository name (Mandatory)
          repository: ${{ github.repository }}

          # Pull Request deployment environment name (Mandatory)
          environment: yabba-da-ba-doo-environment
        env:
          # Default Github Token
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

> `GITHUB_TOKEN` required to make necessary API calls to Github to set the Context and the relevant Status in the PR

## Local Development

Refer [this](https://docs.github.com/en/actions/creating-actions/creating-a-javascript-action) document to learn more on how to create custom Github Actions (JS) 

> Checking in your node_modules directory can cause problems. As an alternative, you can use a tool called `@vercel/ncc` to compile your code and modules into one file used for distribution.

* Install `vercel/ncc` by running this command in your terminal. 
```
npm i -g @vercel/ncc
```
* Compile your `index.js` file. `ncc build index.js --license licenses.txt`
* You'll see a new `dist/index.js` file with your code and the compiled modules. You will also see an accompanying `dist/licenses.txt` file containing all the licenses of the `node_modules` you are using.
* Change the main keyword in your `action.yml` file to use the new `dist/index.js` file. `main: 'dist/index.js'`
* If you already checked in your `node_modules` directory, remove it. 
```
rm -rf node_modules/*
```
