#!/usr/bin/env ruby
require 'bunny'

connection = Bunny.new(automatically_recover: false)
connection.start

channel = connection.create_channel
queue = channel.queue('work')

begin
  puts ' [*] Waiting for messages. To exit press CTRL+C'
  queue.subscribe(block: true) do |delivery_info, _properties, body|
  puts " [x] Received #{body}"
  # imitate some work
  sleep body.count('.').to_i
  puts ' [x] Done'
end
rescue Interrupt => _
  connection.close

  exit(0)
end