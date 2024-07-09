# AI RAG Template Chat

[![Build Status][github-actions-svg]][github-actions]
[![Coverage Status][coverall-svg]][coverall-io]

The AI RAG Template Chat service provides you with a simple chat front-end to test your [AI RAG Template](https://github.com/mia-platform/ai-rag-template), which contains back-end functionality for the implementation of a Retrieval Augmented Generation system.

This walkthrough will help you create an AI RAG Template Chat microservice via the **AI RAG Chat** application.

## Create the application

In order to create the application, access the Mia-Platform Console, create a new Project (or use an existing one) and go to the **Design** area. From there, select _Applications_ in the main sidebar and click on the _Create new application_ button to access the [Mia-Platform Marketplace](https://docs.mia-platform.eu/docs/marketplace/overview_marketplace).

In the Marketplace you will find a set of preconfigured applications that can be used to instantiate groups of microservices with a well-defined and tested goal. To learn more about applications, please refer to [the detailed documentation](https://docs.mia-platform.eu/docs/marketplace/applications/mia_applications).

For this walkthrough, please select the **AI RAG Chat** application, under the Artificial Intelligence category.

Give your application the name you prefer; in this walkthrough we will refer to it with the following name: **ai-rag-chat**. The application is composed by the following microservices:

- Envoy API Gateway
- AI RAG Template (the RAG back-end)
- AI RAG Template Chat (the chat front-end)

Please fill the required fields and confirm that you want to create the application.

Note that the creation of the AI RAG Template and AI RAG Template Chat microservices will also result in the creation of two repositories on your Git Provider. Moreover, two endpoints will be created:

- `/`: the endpoint on which the chat front-end is exposed
- `/api/chat/completions`: the endpoint that will be contacted each time the user sends a message in the chat

## Save your changes

It is important to know that the application you have just created is not saved yet on the Console. It is not essential to save it right away, since you might need to make other modifications inside of your Project in the Console. If you decide to save your changes now, remember to choose a meaningful commit message (e.g "created application ai-rag-chat").

## Deploy and try out the application

Once all the changes have been saved, you can deploy your Project through the Console. To do so, go to the **Deploy** area of the Console. Here, select the environment and the branch you have worked on and trigger the deployment by clicking on the *deploy* button. When the deployment process has ended you will be able to monitor your runtime status in the Runtime area and check that your application is working.

To access the chat front-end, go to `https:<your-project-url>/` (the front-end is exposed on `/`). Please note that the AI RAG Template does not provide you with embeddings out-of-the-box. To properly configure the back-end and understand its purpose and capabilities, please refer to the [AI RAG Template documentation](https://github.com/mia-platform/ai-rag-template/blob/main/README.md).

[github-actions]: https://github.com/mia-platform-marketplace/React-App-Template/actions
[github-actions-svg]: https://github.com/mia-platform-marketplace/React-App-Template/workflows/Node.js%20CI/badge.svg
[coverall-svg]: https://coveralls.io/repos/github/mia-platform-marketplace/React-App-Template/badge.svg?branch=master
[coverall-io]: https://coveralls.io/github/mia-platform-marketplace/React-App-Template?branch=master