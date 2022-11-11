import Message from "../components/Message";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../utils/firebase";
export default function Home() {
  
  const [allPosts,setAllPosts] = useState([])
  
  const getPosts = async () =>{
    const collectionRef = collection(db,'posts')
    const q =query(collectionRef,orderBy('timestamp','desc'))
    const unsubscribe = onSnapshot(q,(snapshot)=>{
      setAllPosts(snapshot.docs.map((doc)=>({...doc.data(),id:doc.id})))
    })
  }

  useEffect(()=>{
    getPosts()
  },[])

  return (
    <div>
      <div className="my-10 text-lg font-medium">
        <h2 className="text-slate-400">See what other people are saying :</h2>
      </div>
      {allPosts.map((post)=>(
        <Message key={post.id} {...post}>

        </Message>
      ))}
    </div>
  )
}
