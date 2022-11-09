import {FcGoogle} from 'react-icons/fc'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../../utils/firebase'
import { useRouter } from 'next/router';

export default function Login() {
    const route= useRouter()
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth,googleProvider)
            route.push("/")
        } catch (error) {
            console.log(error)
        }
    }
    
    
    return (
        <div className="w-2/3 mx-auto shadow-xl border-b-4 border-l-4 border-gray-300/50 mt-32 p-10 rounded-2xl">
            <h2 className="text-2xl font-semibold mb-6"
            >Login</h2>
            <div>
                <button
                 onClick={GoogleLogin}
                className="py-3 flex justify-center item-center font-semibold border-2 border-gray-900 w-full py-1 rounded-full hover:bg-gray-900 hover:text-white">
                    <FcGoogle className='text-2xl mr-3'/>
                    Sign in with Google
                </button>
            </div>
        </div>
    )
}