# Spryker Shop Living Styleguide

This repository contains the Spryker Shop Living Styleguide.
The application is based on [GatsbyJS](https://www.gatsbyjs.org/).

## Requirements

Prefer `yarn` over `npm`, as recommended by GatsbyJS.
Tested on `node` version 8.11 (see `.nvmrc` file in the repo).

## Installation

To easily test/develop the application, download the repo and run `yarn install` from the root.
Then move to `./plugins/gatsby-source-spryker-shop` and run again `yarn install` to setup our custom Spryker source plugin.
Take a look at the following steps for the usage.

## Configuration

Go to `./gatsby-config.js`:

```js
    {
      resolve: 'gatsby-source-spryker-shop',
      options: {
        projectRootAbsolutePath: '/absolute/path/to/suite/project' // change this property
      }
    }
```

## Develop the plugin

Go to `./plugins/gatsby-source-spryker-shop`:

```bash
yarn run build # will transpile the code once
yarn run watch # will transpile the code for every change
```

## Navigate the styleguide

Go to main gatby folder `./`:

```bash
yarn run develop
```

Follow the instrucion printed in the terminal to see the frontend and use GraphiQL.
For more info about gatsby CLI, rely on the official [documentation here](https://www.gatsbyjs.org/docs/).
