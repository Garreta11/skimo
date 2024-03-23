'use client'

import { useThemeContext } from '@/components/theme'
import { useEffect, useState } from 'react'

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { menu } = useThemeContext();

  const [width, setWidth] = useState('w-0')

  useEffect(() => {
    if (menu) {
      setWidth('w-4/6')
    } else {
      setWidth('w-full')
    }
  }, [menu])


  return (
    <div className={`${width} duration-500 transition-all`}>
      {children}
    </div>
  )
}
