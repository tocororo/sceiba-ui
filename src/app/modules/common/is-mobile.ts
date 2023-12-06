export function isMobile() {
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return window?.innerWidth < 768 || regex.test(navigator.userAgent) || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isMobileBrowser(){
  const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return regex.test(navigator.userAgent) || 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function isMinWindows(){
  return window?.innerWidth < 768;
}
