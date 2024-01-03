import { NextResponse } from "next/server";
import { connectToDatabase }  from "@/lib/mongodb";
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
        const collection = db.collection('pickuplines');
        console.log(req);
        const body = await req.json();
        console.log(body);

        console.log(body.id);
        
        const filter = { _id: new mongoose.Types.ObjectId(body.id) };
        const update = {
            $inc: { upvote: 1 }
        };

        const result = await collection.findOneAndUpdate(filter, update);

        console.log(result);

        if (!result) {
            return NextResponse.json({ error: 'Record not found' });
        }

        return NextResponse.json({ message: 'Upvote count increased successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}