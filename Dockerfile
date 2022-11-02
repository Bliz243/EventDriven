FROM ruby:3.1.2-alpine3.16

WORKDIR /src

COPY ruby-docker/. /src

RUN bundle install
RUN ls -a

CMD ["ruby", "test.rb"]
