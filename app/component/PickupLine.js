export default function PickupLines({ id, text, upvoteCount, upvoteClick, isUpvote }) {
    return (
        <li className="flex gap-4 p-3 hover:rounded-tr-lg hover:bg-gradient-to-tr from from-white via-white from to-red-100 transition-all">
            {/* <div className="flex flex-col gap-2 items-center justify-start">
                <img alt="Naval profile" loading="lazy" width="359" height="359" decoding="async" data-nimg="1" className="w-8 h-8 rounded-full text-transparent" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75" />
                <span className="badge">#1</span>
            </div> */}
            <div className="relative whitespace-pre-line h-full  overflow-hidden truncate flex-1 max-h-[130px] ">{text}</div>
            <button className="group flex flex-col justify-start items-center gap-0.5 cursor-pointer h-min " onClick={() => upvoteClick(id)}>
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5  ${isUpvote ? 'text-red-500' : 'text-gray-700'}`}><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg> */}
                {!isUpvote && <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" fill="currentColor" className='text-gray-500 group-hover:text-red-500'><path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" /></svg>
                }
                {isUpvote && <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512" fill="currentColor" className='text-red-500'><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" /></svg>
                }

                <span className={`text-sm ${isUpvote ? 'text-red-500' : 'text-gray-500 group-hover:text-red-500'}`}>{upvoteCount}</span>
            </button>
        </li>
    )
}