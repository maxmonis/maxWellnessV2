# maxWellness

Allows personal trainers to track their workouts and those of their clients.

This is v2 of the app, the original can be found at
[github.com/maxmonis/maxWellness](https://github.com/maxmonis/maxWellness).

---

## Requirements

You'll need `Node.js`, `Yarn`, and `NVM (Node Version Manager)` installed on
your machine to run this app locally.

Node can be installed by following the instructions at
[nodejs.org](https://nodejs.org/).

Yarn can then be added:

```
npm install --global yarn
```

You can add NVM by following the instructions at
[@nvm-sh/nvm](https://github.com/nvm-sh/nvm).

---

## Installation

Clone the repo onto your machine and cd into it:

```
git clone https://github.com/maxmonis/max-wellness.com.git
cd max-wellness.com
```

Get the latest recommended version of Node.js (stored in `.nvmrc`):

```
nvm use
```

Download all dependencies:

```
yarn install
```

---

## Configuration

Ensure you're using the correct Node version:

```
nvm use
```

Create gitignored env files:

```
touch .env.local .env.test.local
```

Add a project on [firebase](https://console.firebase.google.com/). Once you have
a corresponding credential for every firebaseConfig value (they all start with
`REACT_APP_`), put them in the env files you created.

---

## Development

Start the app in development mode:

```
yarn dev
```

Start the app in development mode with Mock Service Worker mock API enabled:

```
yarn dev:msw
```

---

## Production

Create a production build of the app:

```
yarn build
```

---

## Testing

Launch the test runner in the interactive watch mode:

```
yarn test
```

Start the app in development mode and open Cypress end to end tests:

```
yarn e2e
```
