import { useCallback, useState } from 'react'

const BOOTED_KEY = 'booted'

// Once per browser tab session, and never for reduced motion.
function shouldBoot() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(BOOTED_KEY) === null
  } catch {
    return false
  }
}

export function useBoot() {
  const [booting, setBooting] = useState(shouldBoot)

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOTED_KEY, '1')
    } catch {
      // It just plays again next load.
    }
    setBooting(false)
  }, [])

  return { booting, finishBoot }
}
