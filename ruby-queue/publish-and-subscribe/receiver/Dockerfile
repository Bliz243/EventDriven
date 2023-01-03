FROM ruby:3.0.4

ADD Gemfile /app/
ADD Gemfile.lock /app/

RUN apk add --no-cache git
RUN apk --update add --virtual build-dependencies ruby-dev build-base && \
    cd /app && bundle install --without development:test && \
    apk del build-dependencies

ADD . /app
RUN chown -R nobody:nogroup /app
USER nobody
WORKDIR /app
CMD bin/worker


