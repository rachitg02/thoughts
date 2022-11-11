import {auth, db} from "../utils/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { doc, addDoc, collection, serverTimestamp, updateDoc } from "firebase/firestore";
import {toast} from 'react-toastify'

export default function Dashboard() {
    const [user,loading]= useAuthState(auth)
    const route = useRouter();
    const updateData = route.query;
    const [post,setPost] = useState({text:""})
    const submitPost=async (e) =>{
        e.preventDefault();

       if(!post.text){
        toast.error("Text field is empty")
        return
       }
       
       if(post.text.length >260){
        toast.error("Text is too long")
        return
       }

       if(post?.hasOwnProperty('id')) {
        const docRef = doc(db,'posts',post.id)
        const updatedPost = {...post,timestamp:serverTimestamp()}
        await updateDoc(docRef,updatedPost)
        toast.success('Post Edited')
        return route.push('/')
       }
       else {
        const collectionRef = collection(db,'posts')
        await addDoc(collectionRef,{
            ...post,
            timestamp:serverTimestamp(),
            user:user.uid,
            avatar: user.photoURL,
            username: user.displayName,
        })
        setPost({text:""})
        toast.success('Post Submited')
        route.push('/')
       }
    }
        const checkUser = async ()=>{
        if(loading) return;
        if(!user) return route.push("/auth/login")
        if(updateData.id){
            setPost({text: updateData.text, id:updateData.id})
        }
    }

    useEffect(()=>{
        checkUser();
    },[user,loading])
    return (
        <div className="mt-32 p-12 shadow-lg bg-gray-100/50 border-b-4 border-l-4 border-gray-300/50 rounded-2xl max-w-md mx-auto">
            <form onSubmit={submitPost}>
                <h1 className="text-xl font-semibold"
                >{post.hasOwnProperty('id')? 'Edit your post':'Share your thoughts'}</h1>
                <div className="py-2">
                    <textarea 
                    value={post.text} 
                    placeholder="Write . . . ." 
                    className="px-4 py-2 mt-5 bg-gray-200/50 w-full h-52 rounded-2xl scrollbar scrollbar-thin scrollbar-thumb-gray-300/50 scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
                    onChange={(e)=>setPost({...post,text:e.target.value})}></textarea>
                    <p className={`text-xs my-2 mx-2 ${post.text.length > 260 ? "text-red-500" : "text-gray-500"}`} 
                    >{post.text.length}/260</p>
                </div>
                <button 
                type="submit"
                className="w-full bg-green-400 text-white text-xl py-1 font-bold rounded-lg hover:bg-green-300"
                >Submit</button>
            </form>
        </div>
    )
}