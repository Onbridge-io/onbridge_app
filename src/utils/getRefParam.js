export function getRefParam() {
  return new URLSearchParams(window.location.search).get('referrer')
}
