export default function Section({ children, side = 'left' }: { children: React.ReactNode, side?: String }) {
  return (
    <section className={`w-full min-h-screen p-10 flex items-center font-panchang ${side == 'left' ? 'flex-row' : 'flex-row-reverse'} bg-white`}>
      {children}
    </section>
  )
}
