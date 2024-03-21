export default function Section({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full h-screen p-10 flex justify-center	items-center bg-white">
      {children}
    </section>
  )
}
