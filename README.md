# OnBridge Frontend DApp

### User interface of OnBridge NFT cross-chain gateway.

<br>

## Project must contain following environment variables

```txt
REACT_APP_API_HOST='https://api-staging.onbridge.io/api'
```

## Development server

Run `yarn` for install packages

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Production server

This app designed to be built as a docker compose service from the root repository.

You can use docker to build and run it separately

```sh
docker build -t app .
docker run -it -p 80:80 app
```

Then navigate to http://127.0.0.1/ and have fun :-)
