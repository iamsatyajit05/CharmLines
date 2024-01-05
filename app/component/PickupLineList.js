"use client"
import { useEffect, useState } from "react";
import PickupLines from "./PickupLine"

export default function PickupLinesList({ user }) {
    const [records, setRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

            if (response.ok) {
                setRecords(data.records);
            } else {
                console.error(data.error);
            }


            if (isLoading) {
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
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
                // Refresh the records after updating
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

    return (
        <section className="px-4 mb-24">
            {!isLoading && <ul className="divide-y">
                {
                    records && records.map((e, index) => <PickupLines key={index} id={e._id} text={e.text} upvoteCount={e.upvote} upvoteClick={updateRecord} isUpvote={e.isUpvote} />)
                }
            </ul>}
            {isLoading && <p className="text-center">Wait a bit too find best pickupline to start conversation 🙃</p>}
        </section>
    )
}