require 'sinatra'
require 'json'

get '/decline_events' do
  events = [
    { id: "1", summary: "Meeting", description: "No agenda here" },
    { id: "2", summary: "Workshop", description: "アジェンダあり" }
  ]

  events_to_decline = events.reject { |event| event[:description]&.include?("アジェンダ") }

  content_type :json
  events_to_decline.to_json
end