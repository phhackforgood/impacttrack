import db from "@/db"; 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User, Event } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(request: Request, response: Response) { 
    try {
        const formData = await request.formData();
        console.log(formData);
        const text = formData.get('text') as string;
        const hours = formData.get('hours') as string;
        const new_hours = parseInt(hours);
        const date = formData.get('date') as string;
        const new_Date = new Date(date);
        const eventName = formData.get('eventName') as string;
        const image = formData.get('image') as File;
        const cookieStore = cookies();
        const user = await db.getUser(cookieStore);
        const event  = await db.getEventbyTitle(eventName as string);
        const eventId = event.id;
        if (!user) {
            throw new Error("Not authenticated");
        } else {
            const result = await db.submitForm(text, new_hours, new_Date, eventId, image, user.id);
            console.log('result:', result);
            const formId = result.id;
            const result2 = await db.addFormtoEvent(eventId, formId);
            console.log('result2:', result2);
            return NextResponse.json(result2); 
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