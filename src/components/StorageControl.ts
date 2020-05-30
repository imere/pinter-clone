function sget(key: string): string {
  let item = sessionStorage.getItem(key);
  if (item != null) {
    return item;
  }
  return "";
}
function sset(key: string, value: string): boolean {
  sessionStorage.setItem(key, value);
  return true;
}
function sremove(key: string): boolean {
  sessionStorage.removeItem(key);
  return true;
}
function sclear(): boolean {
  sessionStorage.clear();
  return true;
}

export { sget, sset, sremove, sclear };
