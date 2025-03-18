# saforus-web
SaForus/Media Protect Web App/Web Portal.

### Running From Docker(On Local System)

  npx pnpm install
  npx pnpm run build
  docker build -t dev-saforus-web-0.1.1 --build-arg WEB_ENV=development .
  docker run -d -p 80:80 --name dev-saforus-web-0.1.1 dev-saforus-web-0.1.1 &


#### Note:

- Check project.json for project name
- Install nvm first if you haven't: https://github.com/nvm-sh/nvm
  &nbsp;
  This is used in precommit husky script, and is a powerful tool that help you manage your node versions.

### Installation

```bash
$ npm install
```

### Run Build

```bash
$ npx nx build <app-name>
```

### Run App

```bash
$ npx nx serve <app-name>
```

or (but should prefer use the above)

```bash
$ npm start
```

### View dependencies graph:

```bash
$ npx nx graph
```

### Working with Nx workspace project

You can pay a visit in their docs: https://nx.dev/.
&nbsp;

Mostly our code will stay in `apps` and `libs` folders:
&nbsp;

`apps`: Root of your app. For example `saforus-web`. Should only contain the highest level config of your app. Every details should stay in:

- To add another app, can refer to their docs, for example: https://nx.dev/packages/rspack/documents/overview
- Run `nx g @nrwl/web:app my-app --style=css` to create a new rspack app.
- Created app will stay inside `apps` folder, same as `libs`.
  &nbsp;

`libs`: Folder contains all of your library/dependencies. Should think about how to structure your folder when adding new lib.

### Add Package/Library (will stay inside `libs` folder)

```bash
nx g lib <project-name> --directory=<your/folder/directory/levels>
```

### Remove App/Libs (will help you should check for any dependencies before doing the remove)

```bash
nx g rm <project-name>
```
