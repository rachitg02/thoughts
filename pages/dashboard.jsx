import {auth} from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect } from "react";


export default function Dashboard() {
    const [user,loading]= useAuthState(auth)
    const route = useRouter();
    const getData = async ()=>{
        if(loading) return;
        if(!user) return route.push("/auth/login")
    }

    useEffect(()=>{
        getData();
    },[user,loading])

    return (
        <div>
            <h1>Your Posts</h1>
            <div>posts</div>
            <button onClick={()=>auth.signOut()}>Logout</button>
        </div>
    )
}