'use client'

export default function Wrapper({ children }: { children: React.ReactNode }) {

  return (
    <div className={`w-full duration-500 transition-all`}>
      {children}
    </div>
  )
}
