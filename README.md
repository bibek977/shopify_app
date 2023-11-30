# Shopify App Template - Django

This is a template for building a [Shopify app](https://shopify.dev/docs/apps/getting-started) using Django and React. It contains the basics for building a Shopify app.

## Benefits

Shopify apps are built on a variety of Shopify tools to create a great merchant experience. The [create an app](https://shopify.dev/docs/apps/getting-started/create) tutorial in our developer documentation will guide you through creating a Shopify app using this template.

The Django app template comes with the following out-of-the-box functionality:

-   OAuth: Installing the app and granting permissions
-   GraphQL Admin API: Querying or mutating Shopify admin data
-   REST Admin API: Resource classes to interact with the API
-   Shopify-specific tooling:
    -   AppBridge
    -   Polaris
    -   Webhooks

## Tech Stack

This template combines a number of third party open source tools:

-   [Django](https://docs.djangoproject.com/en/4.2/) builds and tests the backend.
-   [Vite](https://vitejs.dev/) builds the [React](https://reactjs.org/) frontend.
-   [React Router](https://reactrouter.com/) is used for routing. We wrap this with file-based routing.
-   [React Query](https://react-query.tanstack.com/) queries the Admin API.
-   [`i18next`](https://www.i18next.com/) and related libraries are used to internationalize the frontend.
    -   [`react-i18next`](https://react.i18next.com/) is used for React-specific i18n functionality.
    -   [`i18next-resources-to-backend`](https://github.com/i18next/i18next-resources-to-backend) is used to dynamically load app translations.
    -   [`@formatjs/intl-localematcher`](https://formatjs.io/docs/polyfills/intl-localematcher/) is used to match the user locale with supported app locales.
    -   [`@formatjs/intl-locale`](https://formatjs.io/docs/polyfills/intl-locale) is used as a polyfill for [`Intl.Locale`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale) if necessary.
    -   [`@formatjs/intl-pluralrules`](https://formatjs.io/docs/polyfills/intl-pluralrules) is used as a polyfill for [`Intl.PluralRules`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/PluralRules) if necessary.

These third party tools are complemented by Shopify specific tools to ease app development:

-   [Shopify API library](https://github.com/Shopify/shopify-api-Django) adds OAuth to the Laravel backend. This lets users install the app and grant scope permissions.
-   [App Bridge React](https://shopify.dev/docs/tools/app-bridge/react-components) adds authentication to API requests in the frontend and renders components outside of the embedded App’s iFrame.
-   [Polaris React](https://polaris.shopify.com/) is a powerful design system and component library that helps developers build high quality, consistent experiences for Shopify merchants.
-   [Custom hooks](https://github.com/Shopify/shopify-frontend-template-react/tree/main/hooks) make authenticated requests to the GraphQL Admin API.
-   [File-based routing](https://github.com/Shopify/shopify-frontend-template-react/blob/main/Routes.jsx) makes creating new pages easier.
-   [`@shopify/i18next-shopify`](https://github.com/Shopify/i18next-shopify) is a plugin for [`i18next`](https://www.i18next.com/) that allows translation files to follow the same JSON schema used by Shopify [app extensions](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions#how-it-works) and [themes](https://shopify.dev/docs/themes/architecture/locales/storefront-locale-files#usage).

## Getting started

### Requirements

1. You must [create a Shopify partner account](https://partners.shopify.com/signup) if you don’t have one.
1. You must create a store for testing if you don't have one, either a [development store](https://help.shopify.com/en/partners/dashboard/development-stores#create-a-development-store) or a [Shopify Plus sandbox store](https://help.shopify.com/en/partners/dashboard/managing-stores/plus-sandbox-store).
1. You must have [Python](https://www.python.org/) installed.
1. You must have [Node.js](https://nodejs.org/) installed.

### Installing the requirements

```shell
    git clone https://github.com/Beekeyinn/shopify_django_cli_boiler_plate
    cd shopify_django_cli_boiler_plate
    npm install or yarn install
```

### Setting up your Django app

Once the Shopify CLI clones the repo, you will be able to run commands on your app.
However, the CLI will not manage your Django dependencies automatically, so you will need to go through some steps to be able to run your app.
These are the typical steps needed to set up a Laravel app once it's cloned:

1. Start off by switching to the `web` folder:

    ```shell
    cd web
    ```

1. Create virtual environment for the python and activate the environment:

    ```shell
    python -m venv venv
    ```

    ### in window

    ```cmd
    venv/Script/activate.bat
    ```

    ### in ubuntu/macOS

    ```shell
    source venv/bin/python
    ```

1. Install requirements
    ```shell
    pip install -r requirements.txt
    ```
1. Create the `.env` file:

    ```shell
    cp .env.example .env
    ```

1. Django by default use [SQLite](https://www.sqlite.org/index.html) database and add it to your `.env` file:

1. Generate an `DJANGO_SECRET` for your app through (https://djecrety.ir/):

1. Create the necessary Shopify tables in your database:

    ```shell
    cd web
    python manage.py migrate
    ```

And your Django app is ready to run! You can now switch back to your app's root folder to continue:

```shell
cd ..
```

### Local Development

[The Shopify CLI](https://shopify.dev/docs/apps/tools/cli) connects to an app in your Partners dashboard.
It provides environment variables, runs commands in parallel, and updates application URLs for easier development.

You can develop locally using your preferred Node.js package manager.
Run one of the following commands from the root of your app:

Using yarn:

```shell
yarn dev
```

Using npm:

```shell
npm run dev
```

Using pnpm:

```shell
pnpm run dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development.

## Deployment

### Application Storage

This template uses [Django Framework](https://docs.djangoproject.com/en/4.2/) to store Shopify session data.
It provides migrations to create the necessary tables in your database, and it stores and loads session data from them.

The database that works best for you depends on the data your app needs and how it is queried.
You can run your database of choice on a server yourself or host it with a SaaS company.
Once you decide which database to use, you can update your Django app's `DB_*` environment variables to connect to it, and this template will start using that database for session storage.

### Build

The frontend is a single page React app. It requires the `SHOPIFY_API_KEY` environment variable, which you can find on the page for your app in your partners dashboard.
The CLI will set up the necessary environment variables for the build if you run its `build` command from your app's root:

Using yarn:

```shell
yarn build --api-key=REPLACE_ME
```

Using npm:

```shell
npm run build --api-key=REPLACE_ME
```

## Developer resources

-   [Introduction to Shopify apps](https://shopify.dev/docs/apps/getting-started)
-   [App authentication](https://shopify.dev/docs/apps/auth)
-   [Shopify CLI](https://shopify.dev/docs/apps/tools/cli)
-   [Shopify API Library documentation](https://github.com/Shopify/shopify-api-Django/tree/main/docs)
-   [Getting started with internationalizing your app](https://shopify.dev/docs/apps/best-practices/internationalization/getting-started)
    -   [i18next](https://www.i18next.com/)
        -   [Configuration options](https://www.i18next.com/overview/configuration-options)
    -   [react-i18next](https://react.i18next.com/)
        -   [`useTranslation` hook](https://react.i18next.com/latest/usetranslation-hook)
        -   [`Trans` component usage with components array](https://react.i18next.com/latest/trans-component#alternative-usage-components-array)
    -   [i18n-ally VS Code extension](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
