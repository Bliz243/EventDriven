#!/usr/bin/env ruby
require 'bunny'

rabbit_host=ENV["RABBIT_HOST"]
rabbit_port=ENV["RABBIT_PORT"]
rabbit_user=ENV["RABBIT_USERNAME"]
rabbit_password=ENV["RABBIT_PASSWORD"]

connection = Bunny.new("amqp://" + rabbit_user + ":" +rabbit_password + "@" + rabbit_host + ":" + rabbit_port)
connection.start

channel = connection.create_channel
queue = channel.queue('task_queue', durable: true)

message = ARGV.empty? ? 'Hello World!' : ARGV.join(' ')

queue.publish(message, persistent: true)
puts " [x] Sent #{message}"

connection.close