import {auth,db} from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, query, where, deleteDoc } from "firebase/firestore";
import Message from "../components/Message";
import {BsFillTrashFill} from 'react-icons/bs'
import {AiFillEdit} from 'react-icons/ai'
import Link from "next/link";

export default function Dashboard() {
    const [user,loading]= useAuthState(auth)
    const route = useRouter();
    const [posts,setPosts] = useState([])
    const getData = async ()=>{
        if(loading) return;
        if(!user) return route.push("/auth/login");
        const collectionRef = collection(db,"posts")
        const q = query(collectionRef, where('user','==',user.uid))
        const unsubscribe = onSnapshot(q,(snapshot)=>{
        setPosts(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    })
        return unsubscribe;
    }

    const deletePost = async(id) =>{
        const docRef = doc(db,'posts',id)
        await deleteDoc(docRef)
    }

    useEffect(()=>{
        getData();
    },[user,loading])


    return (
        <div className="h-full">
            <h1>Your Posts</h1>
            <div>
                {posts.map((post)=>{
                   return <Message {...post} key={post.id}>
                    <div className="flex gap-6 my-2">
                        <button onClick={()=>deletePost(post.id)} className="text-red-400">
                            <BsFillTrashFill className="text-xl"/>
                        </button>
                        <Link href={{pathname:"/post", query:post}}
                        className="text-emerald-400">
                             <AiFillEdit className="text-xl"/>
                        </Link>
                   </div>
                   </Message>
                })}
            </div>
            <div className="flex justify-center mt-8 sticky bottom-0">
            <button
            className="border-2 border-gray-900 rounded-2xl w-full font-bold text-xl py-2 hover:bg-black hover:text-white"
            onClick={()=>auth.signOut()}>Logout</button>
            </div>

        </div>
    )
}