
type intersectionOvserverType = (arg: IntersectionObserverEntry[]) => void

export const useIntersectionObserver = (cb: intersectionOvserverType): IntersectionObserver => {
  return new IntersectionObserver(entries => {
    cb(entries)
  })
}
