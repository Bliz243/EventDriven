FROM ruby:3.0.4

WORKDIR /src

COPY receive.rb /src
COPY Gemfile /src/Gemfile
COPY Gemfile.lock /src/Gemfile.lock

RUN bundle install

CMD ["ruby", "receive.rb"]
