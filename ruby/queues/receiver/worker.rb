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

channel.prefetch(1)
puts ' [*] Waiting for messages. To exit press CTRL+C'

begin
  queue.subscribe(manual_ack: true, block: true) do |delivery_info, _properties, body|
    puts " [x] Received '#{body}'"
    # imitate some work
    sleep body.count('.').to_i
    puts ' [x] Done'
    channel.ack(delivery_info.delivery_tag)
  end
rescue Interrupt => _
  connection.close
end