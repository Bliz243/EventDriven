class Api::V1::StringRevertController < ApplicationController

  def index
  end

  def create
    string=params[:stringChange]
    connect_to_rabbitmq(string)
    render json: { message: 'Message Received'}
  end

  def show
  end

  def destroy
  end

  private

  def connect_to_rabbitmq(string_message)
    require 'bunny'

    rabbit_host=ENV["RABBIT_HOST"]
    rabbit_port=ENV["RABBIT_PORT"]
    rabbit_user=ENV["RABBIT_USERNAME"]
    rabbit_password=ENV["RABBIT_PASSWORD"]

    connection = Bunny.new("amqp://" + rabbit_user + ":" + rabbit_password + "@" + rabbit_host + ":" + rabbit_port)

    connection.start

    channel = connection.create_channel
    queue = channel.queue('test_queue', durable: true)

    message = string_message

    queue.publish(string_message, persistent: true)
    puts " [x] Sent #{message}"

    connection.close
  end
end

