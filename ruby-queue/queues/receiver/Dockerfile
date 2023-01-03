FROM ruby:3.1.2

ADD Gemfile /app/
ADD Gemfile.lock /app/

ADD . /app

WORKDIR /app

RUN bundle install



CMD ["ruby", "worker.rb"]


