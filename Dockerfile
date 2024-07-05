FROM nginx:1.17.2-alpine as build

LABEL name="ai_rag_template_chat" \
  description="This template allows you to start setting up a front-end project to test your RAG template" \
  eu.mia-platform.url="https://www.mia-platform.eu" \
  eu.mia-platform.version="0.1.0"

COPY nginx /etc/nginx

RUN touch ./off \
  && chmod o+rw ./off \
  && echo "ai_rag_template_chat: $COMMIT_SHA" >> /etc/nginx/commit.sha

WORKDIR /usr/static

COPY ./build .

USER nginx