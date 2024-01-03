export default function PickupLines({ id, text, upvoteCount, upvoteClick }) {
    return (
        <li className="flex gap-4 py-4">
            {/* <div className="flex flex-col gap-2 items-center justify-start">
                <img alt="Naval profile" loading="lazy" width="359" height="359" decoding="async" data-nimg="1" className="w-8 h-8 rounded-full text-transparent" srcset="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=384&amp;q=75 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75 2x" src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnaval.6a0c2055.jpeg&amp;w=750&amp;q=75" />
                <span className="badge">#1</span>
            </div> */}
            <div className="relative whitespace-pre-line h-full  overflow-hidden truncate flex-1 max-h-[130px] ">{text}</div>
            <button className="flex flex-col justify-start items-center gap-0.5 cursor-pointer h-min" onClick={() => upvoteClick(id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500 "><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"></path></svg>
                <span className="text-red-500 text-sm">{upvoteCount}</span>
            </button>
        </li>
    )
}