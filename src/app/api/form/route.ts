import db from "@/db"; 
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { User } from "@/types";



export async function POST(request: Request) { 
    try {
        const cookieStore = cookies();
        const user: User | false = await db.getUser(cookieStore); 
        const { text, hours, date, event, img } = await request.json();
        if (!user) {
            throw new Error("Not authenticated");
        } else {
            const result = await db.submitForm(text, hours, date, event, img, user.id);
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