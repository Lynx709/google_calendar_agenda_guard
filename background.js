chrome.runtime.onInstalled.addListener(() => {
    console.log("Google Calendar Agenda Guard 拡張機能がインストールされました！");
});

async function authenticate() {
    return new Promise((resolve, reject) => {
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
            if (chrome.runtime.lastError || !token) {
                reject(chrome.runtime.lastError);
                return;
            }
            resolve(token);
        });
    });
}

async function getEvents(token) {
    const response = await fetch('https://www.googleapis.com/v3/calendars/primary/events', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.json();
}

async function declineEventsWithoutAgenda() {
    const token = await authenticate();
    const events = await getEvents(token);

    events.items.forEach(async (event) => {
        if (!event.description || !event.description.includes("アジェンダ")) {
            await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${event.id}/acl`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            console.log(`イベント「${event.summary}」を辞退しました。`);
        }
    });
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "checkEvents") {
        declineEventsWithoutAgenda();
    }
});

chrome.alarms.create("checkEvents", { periodInMinutes: 10 });