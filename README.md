# ai-rag-template-chat

This project was bootstrapped with [Create Vite](https://vitejs.dev/guide/).

## Available Scripts

In the project directory, you can run:

### `yarn`

Install all dependencies.

### `yarn start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see lint errors in the dev console.

### `yarn dev`

Run `yarn start` with mock-server.

### `yarn test`

Launches the test runner in the interactive watch mode. See the section about [vitest](https://vitest.dev/) for more information.

### `yarn build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://vitejs.dev/guide/static-deploy) for more information.

## Build Docker Image

To build your Docker image you need to build your application using `yarn build` as explained above. Then build your image using `docker build -t ai_rag_template_chat .`.

To run your application use `docker run -d -p 8080:8080 ai_rag_template_chat`. Open [http://localhost:8080](http://localhost:8080) to access your application.

## Learn More

You can learn more in the [Vite documentation](https://vitejs.dev/).

To learn React, check out the [React documentation](https://reactjs.org/).