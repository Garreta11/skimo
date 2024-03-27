import Link from 'next/link';

export default function Footer() {

  return <footer className={`w-full fixed bottom-0 py-5 px-5 text-white mix-blend-difference duration-500 transition-all z-40`}>
    <div className="flex gap-10 m-0 justify-between w-full font-panchang font-bold ">
      <p>©2024</p>
      <p>design and code by: <Link href='https://jordigarreta.com'>Jordi Garreta</Link></p>
    </div>
    
  </footer>
}
