const EVENT_NAME = "dailyPerformanceChanged";

export function emitDailyPerformanceChanged() {
    window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function onDailyPerformanceChanged(callback) {
    window.addEventListener(EVENT_NAME, callback);
    return () => window.removeEventListener(EVENT_NAME, callback);
}
