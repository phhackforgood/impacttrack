import db from "@/db"; 
import { NextResponse } from "next/server";




export async function GET(request: Request) { 
    try {
        const result = await db.getEventsForms();
        // return list of events with forms
        const eventForms = result.map((event: any) => {
            return {
                eventName: event.title,
                forms: event.forms,
                userList: event.userList,
            }
        })
        return NextResponse.json(eventForms);
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