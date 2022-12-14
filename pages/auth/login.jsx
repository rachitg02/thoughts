import {FcGoogle} from 'react-icons/fc'
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {auth} from '../../utils/firebase'
import { useRouter } from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect } from 'react';

export default function Login() {
    const route= useRouter()
    const googleProvider = new GoogleAuthProvider();
    const [user,loading] = useAuthState(auth)

    const GoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth,googleProvider)
            route.push("/")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(user){
            route.push('/')
        }
        else console.log("login")
        },[user])
    
    return (
        <div className="bg-gray-100/50 max-w-md mx-auto shadow-xl border-b-4 border-l-4 border-gray-300/50 mt-32 p-10 rounded-2xl">
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