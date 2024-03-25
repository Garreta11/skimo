export default function Section({ children, side = 'left' }: { children: React.ReactNode, side?: String }) {
  return (
    <section className={`w-full min-h-screen flex items-center font-panchang flex-col mb-8 lg:mb-0 ${side == 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white`}>
      {children}
    </section>
  )
}
