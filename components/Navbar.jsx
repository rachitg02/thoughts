import Link from "next/link";

export default function Navbar(){
    return (
       <nav className="flex justify-between item-center py-10">
        <Link href='/'>
            <button className="font-black text-2xl">Thoughts</button>
        </Link>
        <ul className="flex item-center gap-10">
            <Link 
            className="hover:bg-gray-900 hover:text-white text-medium font-semibold border-2 px-2 py-1 rounded-xl border-gray-900 shadow-lg" 
            href='/auth/Login'>
            Join Now
            </Link>
        </ul>
       </nav>
    )
}