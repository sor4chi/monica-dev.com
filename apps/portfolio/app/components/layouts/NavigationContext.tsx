import { createContext, useCallback, useContext, useState } from 'react'

interface NavigationContextValue {
  isOpen: boolean
  toggle: () => void
  close: () => void
}

const NavigationContext = createContext<NavigationContextValue>({
  isOpen: false,
  toggle: () => {},
  close: () => {},
})

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <NavigationContext value={{ isOpen, toggle, close }}>
      {children}
    </NavigationContext>
  )
}

export function useNavigation() {
  return useContext(NavigationContext)
}
