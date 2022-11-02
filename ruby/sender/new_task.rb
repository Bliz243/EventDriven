#!/usr/bin/env ruby
require 'bunny'

connection = Bunny.new(automatically_recover: false)
connection.start

channel = connection.create_channel
queue = channel.queue('work')
message = ARGV.empty? ? 'Hello Stefan!' : ARGV.join(' ')

queue.publish(message, persistent: true)
puts " [x] Sent #{message}"