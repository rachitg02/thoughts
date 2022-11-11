export default function Message({children, avatar, username, text}) {
  return (
    <div className="mt-5 p-4 shadow-lg border-b-4 border-l-4 border-gray-200/50 rounded-2xl mx-auto bg-white">
        <div className="flex flex-row items-center gap-3">
            <img src={avatar} className='w-10 rounded-full'/>
            <h2>{username}</h2>
        </div>
        <div className="py-4">
            <p>{text}</p>
        </div>
        {children}
    </div>
  )
}
