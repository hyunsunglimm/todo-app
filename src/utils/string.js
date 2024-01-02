export function matchString(string) {
  const match = /\[(.*?)\]/.exec(string);
  return match ? match[1] : "";
}

export function replaceString(string) {
  return string.replace(/\[.*?\]/, "").trim();
}
