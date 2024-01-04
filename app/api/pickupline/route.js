import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { mongoose } from "mongoose";

export async function POST(req) {
    try {
        const db = await connectToDatabase();
        const pickupline = db.collection('pickuplines');

        const body = await req.json();

        const initRecords = await pickupline.find().toArray();
    
        const records = initRecords.map(record => {
            const isUpvote = record.upvoters && record.upvoters.includes(body.user);
            return { ...record, isUpvote };
        });

        return NextResponse.json({ records });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function PUT(req) {
    try {
        const db = await connectToDatabase();
        const pickupline = db.collection('pickuplines');

        const body = await req.json();

        const existingPickupline = await pickupline.findOne({ _id: new mongoose.Types.ObjectId(body.id) });

        if (!existingPickupline) {
            return NextResponse.json({ error: 'Record not found' });
        }

        const upvoters = existingPickupline.upvoters || [];

        const userEmailIndex = upvoters.indexOf(body.user);

        if (userEmailIndex !== -1) {
            // User already upvoted, remove the upvote
            upvoters.splice(userEmailIndex, 1);
            await pickupline.updateOne(
                { _id: existingPickupline._id },
                { $set: { upvoters, upvote: existingPickupline.upvote - 1 } }
            );
        } else {
            // User hasn't upvoted, add the upvote
            upvoters.push(body.user);
            await pickupline.updateOne(
                { _id: existingPickupline._id },
                { $set: { upvoters, upvote: existingPickupline.upvote + 1 } }
            );
        }

        return NextResponse.json({ message: 'Upvote count increased successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}