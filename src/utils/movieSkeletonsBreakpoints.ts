export function skeletonBreakpoints() {
  const tabletBreakpoint = 640
  const desktopBreakpoint = 1280

  if (window.innerWidth < tabletBreakpoint) {
    return 3
  } else if (window.innerWidth < desktopBreakpoint) {
    return 4
  }

  return 5
}
