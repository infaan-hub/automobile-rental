export function money(value) {
  return `$${Number(value || 0).toFixed(0)}/day`;
}

export function moneyAmount(value) {
  return `$${Number(value || 0).toFixed(0)}`;
}
