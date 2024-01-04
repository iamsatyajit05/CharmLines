"use client"
import { useEffect, useState } from "react";
import PickupLines from "./PickupLine"

export default function PickupLinesList({ user }) {
    const [records, setRecords] = useState([]);

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
                console.log(data.records);
                setRecords(data.records);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const updateRecord = async (id) => {
        try {
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
            <ul className="divide-y">
                {
                    records && records.map((e, index) => <PickupLines key={index} id={e._id} text={e.text} upvoteCount={e.upvote} upvoteClick={updateRecord} isUpvote={e.isUpvote} />)
                }
            </ul>
        </section>
    )
}