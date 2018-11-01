function sget(key: string): string {
  try {
    let item = sessionStorage.getItem(key)
    if (item !== null && item !== undefined) {
      return item
    }
  } catch (ex) {
    console.error('session failed')
    return ''
  }
  return ''
}
function sset(key: string, value: string): boolean {
  try {
    sessionStorage.setItem(key, value)
  } catch (ex) {
    return false
  }
  return true
}
function sremove(key: string): boolean {
  try {
    sessionStorage.removeItem(key)
  } catch (ex) {
    return false
  }
  return true
}
function sclear(): boolean {
  try {
    sessionStorage.clear()
  } catch (ex) {
    return false
  }
  return true
}

export { sget, sset, sremove, sclear }
