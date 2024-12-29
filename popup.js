document.addEventListener('DOMContentLoaded', () => {
    fetch('event_to_decline.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('content').innerText = data.map(event => `イベント： ${event.summary}`).join("\n");
    });
});