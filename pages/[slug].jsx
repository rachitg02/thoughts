import { arrayUnion, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../components/Message";
import { auth,db } from "../utils/firebase";
import { doc,onSnapshot } from "firebase/firestore";

export default function Details() {
    const router = useRouter();
    const routeData = router.query;
    const [message,setMessage] = useState("")
    const [allMessage,setAllMessages] = useState([])
    
    const submitMessage = async() =>{
        if(!auth.currentUser) return router.push('/auth/login');
        if(!message){
            toast.error("No comment to submit")
            return;
        }
        const  docRef = doc(db,'posts', routeData.id)
        await updateDoc(docRef,{
            comments: arrayUnion({
                message,
                avatar: auth.currentUser.photoURL,
                userName: auth.currentUser.displayName,
                time: Timestamp.now(),
            })
        })
    }
    
     const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

    useEffect(()=>{
        if(!router.isReady) return;
        getComments();
    },[router.isReady])

    return (
    <div>
        <Message {...routeData}></Message>
        <div className="my-4">
            <div className="flex gap-1">
                <input 
                onChange={(e)=>setMessage(e.target.value)}
                type="text" 
                value={message} 
                placeholder="comment"
                className="text-sm px-4 py-1 bg-gray-200/50 w-full h-12 rounded-full hover:bg-gray-100/50 hover:border-2 hover:border-gray-900"
                />
                <button
                onClick={submitMessage} 
                className="bg-green-400 text-white font-bold px-2 rounded-full hover:bg-green-300"
                >Submit</button>
            </div>
            <div className="my-4 py-6 px-2 rounded-2xl shadow-lg border-b-4 border-l-4 border-gray-200/50 bg-green-100/50">
                <h2 
                className="mx-6 font-bold text-lg">
                    Comments
                </h2>
                {allMessage?.map((message) => (
            <div className="p-4 my-1" key={message.time}>
              <div className="flex items-center gap-3 mb-2">
                <img
                  className="w-10 rounded-full"
                  src={message.avatar}
                  alt=""
                />
                <h2 className="bg-gray-400 text-white rounded-full px-2 font-bold">{message.userName}</h2>
              </div>
              <h2
              className="mx-14 text-sm">{message.message}</h2>
            </div>
          ))}
            </div>
        </div>
    </div>
    )
}