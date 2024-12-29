require 'json'

events = [
  { id: "1", summary: "Meeting", description: "No agenda here" },
  { id: "2", summary: "Workshop", description: "アジェンダあり" }
]

events_to_decline = events.reject { |event| event[:description]&.include?("アジェンダ") }

File.write("../events_to_decline.json", JSON.pretty_generate(events_to_decline))
puts "辞退対象のイベントデータを生成しました！"