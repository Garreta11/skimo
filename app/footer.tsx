import Link from 'next/link';

export default function Footer() {

  return <footer className={`w-full fixed bottom-0 py-5 px-5 text-white mix-blend-difference duration-500 transition-all z-40`}>
    <div className="flex gap-10 m-0 justify-between w-full font-panchang font-bold text-xs lg:text-base">
      <p>©2024</p>
      <p className='text-right flex gap-2'><span className='hidden lg:block'>design and code </span>by <Link href='https://jordigarreta.com'>Jordi Garreta</Link></p>
    </div>
    
  </footer>
}
