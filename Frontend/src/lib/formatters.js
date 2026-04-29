export function money(value) {
  return `${moneyAmount(value)} / day`;
}

export function moneyAmount(value) {
  return `TZS ${Number(value || 0).toLocaleString("en-TZ", { maximumFractionDigits: 0 })}`;
}
