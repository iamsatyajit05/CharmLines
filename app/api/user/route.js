import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/options";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: 'Authentication required' });
        }

        const userEmail = session.user.email;
        const userName = session.user.name;

        return NextResponse.json({ userEmail, userName });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error' });
    }
}