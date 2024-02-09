import db from "@/db"; 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User, Event } from "@/types";



export async function POST(request: Request, response: Response) { 
    try {
        console.log('event: START');
        const { text, hours, date, eventName, image } = await request.json();
        console.log("image:", image);
        const cookieStore = cookies();
        const user: User | false = await db.getUser(cookieStore);
        console.log('eventName:', eventName);
        console.log('event: START');
        const event  = await db.getEventbyTitle(eventName);
        // console.log('event:' + event);
        const eventId = event.id;
        console.log('eventId:', eventId);
        if (!user) {
            throw new Error("Not authenticated");
        } else {
            const result = await db.submitForm(text, hours, date, eventId, image, user.id);
            return NextResponse.json(result); 
        }  
    } catch (err: any) { 
        return new Response( 
            JSON.stringify({ error: err.message || err.toString() }), 
            { 
                status: 500, 
                headers: { 
                    'Content-Type': 'application/json', 
                }, 
            } 
        ) 
    } 
}