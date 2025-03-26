export function toShortDate(dateStr: string | undefined): string {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleString("ru-RU", {
        month: "short",
        day: "numeric",
    });
}

export function toLongDate(dateStr: string | undefined): string {
    if (!dateStr) return "";

    return new Date(dateStr).toLocaleString("ru-RU", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}
