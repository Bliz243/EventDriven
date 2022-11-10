FROM ruby:3.0.4

WORKDIR /src

COPY send.rb /src
COPY Gemfile /src
COPY Gemfile.lock /src

RUN bundle install

CMD ["ruby", "send.rb"]
