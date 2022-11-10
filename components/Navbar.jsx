import Link from "next/link";
import {auth} from '../utils/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'

export default function Navbar(){
    const [user,loading] = useAuthState(auth)
    return (
       <nav className="flex justify-between item-center py-10">
        <Link href='/'>
            <button className="font-bold text-2xl">Thoughts</button>
        </Link>
        <ul className="flex item-center gap-10">
            {!user && (
            <Link 
            className="hover:bg-gray-900 hover:text-white text-medium font-semibold border-2 px-2 py-1 rounded-xl border-gray-900 shadow-lg" 
            href='/auth/login'>
            Join Now
            </Link>
            )}
            {user && (
                <div className="flex items-center gap-4">
                    <Link href='/post'>
                        <button
                        className="bg-white text-black border-2 border-gray-900 font-bold hover:bg-gray-900 hover:text-white px-4 py-1 rounded-lg"
                        >Post</button>
                    </Link>
                    <Link href='/dashboard'>
                        <img
                        className="w-12 rounded-full cursor-pointer" 
                        src={user.photoURL}/>
                    </Link>
                </div>
            )}
        </ul>
       </nav>
    )
}