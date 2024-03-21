'use client'

import { ReactLenis, useLenis } from '@studio-freight/react-lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {

  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  )
}
