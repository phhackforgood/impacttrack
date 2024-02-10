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
        const user = await db.getUser(cookieStore);
        const event  = await db.getEventbyTitle(eventName);
        const eventId = event.id;
        console.log('eventId:', eventId);
        if (!user) {
            throw new Error("Not authenticated");
        } else {
            const result = await db.submitForm(text, hours, date, eventId, image, user.id);
            console.log('result:', result);
            const formId = result.id;
            const result2 = await db.addFormtoEvent(eventId, formId);
            console.log('result2:', result2);
            return NextResponse.json(result2); 
        }  
    } catch (err: any) { 
        throw new Error(err.message || err.toString());
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