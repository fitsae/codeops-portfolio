// lib/format.js
export const etb = new Intl.NumberFormat("en-ET", {
  style: "currency",
  currency: "ETB",
  maximumFractionDigits: 0,
});

export const when = new Intl.DateTimeFormat("en-ET", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Addis_Ababa",
});

export const relative = (() => {
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  return (timestamp) => {
    const elapsedSeconds = Math.round(
      (new Date(timestamp).getTime() - Date.now()) / 1000,
    );
    const elapsedMinutes = Math.round(elapsedSeconds / 60);

    if (Math.abs(elapsedMinutes) < 60) {
      return formatter.format(elapsedMinutes, "minute");
    }
    const elapsedHours = Math.round(elapsedMinutes / 60);
    if (Math.abs(elapsedHours) < 24) {
      return formatter.format(elapsedHours, "hour");
    }
    return formatter.format(Math.round(elapsedHours / 24), "day");
  };
})();
