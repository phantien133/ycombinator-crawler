FROM ruby:2.7.3

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && \
  apt-get update -qq && \
  apt-get install -y build-essential \
  default-libmysqlclient-dev \
  nodejs \
  vim

ENV APP_ROOT /rails_app

RUN mkdir -p $APP_ROOT
WORKDIR $APP_ROOT

ADD Gemfile $APP_ROOT
ADD Gemfile.lock $APP_ROOT

RUN gem install rails
RUN gem install rubocop
RUN cd $APP_ROOT && bundle

ADD package.json $APP_ROOT
ADD yarn.lock $APP_ROOT

RUN npm install -g yarn
RUN npm install -g eslint
RUN cd $APP_ROOT && yarn
