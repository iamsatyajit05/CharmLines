import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { mongoose } from "mongoose";

export async function GET(req) {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('pickuplines');

        const records = await collection.find().toArray();

        return NextResponse.json({ records });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}

export async function PUT(req) {
    try {
        const db = await connectToDatabase();
        const pickuplineCollection = db.collection('pickuplines');
        const upvoteCollection = db.collection('upvotes');

        const body = await req.json();

        const existingUpvote = await upvoteCollection.findOne({ post: body.id, user: body.user });

        if (existingUpvote) {
            existingUpvote.isUpvote = !existingUpvote.isUpvote;
            await upvoteCollection.updateOne(
                { _id: existingUpvote._id },
                { $set: { isUpvote: existingUpvote.isUpvote } }
            );

            const filter = { _id: new mongoose.Types.ObjectId(body.id) };
            const update = {
                $inc: { upvote: existingUpvote.isUpvote ? 1 : -1 }
            };

            const result = await pickuplineCollection.findOneAndUpdate(filter, update);
        } else {
            await upvoteCollection.insertOne({ post: body.id, user: body.user, isUpvote: true });

            const filter = { _id: new mongoose.Types.ObjectId(body.id) };
            const update = {
                $inc: { upvote: 1 }
            };

            const result = await pickuplineCollection.findOneAndUpdate(filter, update);
        }


        if (!result) {
            return NextResponse.json({ error: 'Record not found' });
        }

        return NextResponse.json({ message: 'Upvote count increased successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}