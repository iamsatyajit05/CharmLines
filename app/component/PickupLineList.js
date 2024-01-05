"use client"
import { useEffect, useState } from "react";
import PickupLines from "./PickupLine"
import { set } from "mongoose";

export default function PickupLinesList({ user }) {
    const [records, setRecords] = useState([]);
    // True: Latest
    // False: Popular
    const [sortOption, setSortOption] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchRecords = async () => {
        try {
            const response = await fetch('/api/pickupline', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user }),
            });
            const data = await response.json();

            if(data.error) {
                console.log(data);
                setError('Sorry something went wrong, Try again 😶')
                throw 'Sorry something went wrong, Try again 😶';
            }

            if (response.ok) {
                setRecords(data.records);
                setError('');
            } else {
                console.error(data.error);
            }            
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            if (isLoading) {
                setIsLoading(false);
            }
        }
    };

    const updateRecord = async (id) => {
        try {
            if (!user) {
                alert('Please Login to Upvote');
                return;
            }
            const response = await fetch(`/api/pickupline`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, user }),
            });

            const data = await response.json();

            if (response.ok) {
                fetchRecords();
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating record:', error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    const toggleSortOption = () => {
        if(sortOption) {
            const sortRecord = records.sort((a, b) => b.upvote - a.upvote);
            setSortOption(false);
            setRecords(sortRecord)
        } else {
            const sortRecord = records.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            console.log(sortRecord);
            setSortOption(true);
            setRecords(sortRecord)
        }
    };

    return (
        <section className="px-4 md:p-0 mb-24">
            {!isLoading && !error && <div className="space-y-4">
                <div className="flex justify-end">
                    <button onClick={toggleSortOption} className="relative w-20 border bg-[#ebebeb] rounded-md hover:bg-gray-300 text-sm font-medium h-7 transition-all">
                        <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${sortOption === true ? '' : 'translate-x-[-25%] opacity-0'}`}>Latest</div>
                        <div className={`absolute left-0 top-0 w-full h-full flex justify-center items-center transition-all duration-75 ${sortOption === false ? 'translate-x-0' : 'translate-x-[25%] opacity-0'}`}>Popular</div>
                    </button>
                </div>
                <ul className="divide-y">
                    {
                        records && records.map((e, index) => <PickupLines key={index} id={e._id} text={e.text} upvoteCount={e.upvote} upvoteClick={updateRecord} isUpvote={e.isUpvote} category={e.category} />)
                    }
                </ul>
            </div>}
            {isLoading && <p className="text-center">Wait a bit too find best pickupline to start conversation 🙃</p>}
            {error && <p className="text-center">{error}</p>}
        </section>
    )
}