import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { User, Event } from '@/types';

const POCKET_BASE_URL = process.env.POCKET_BASE_URL;

export class DatabaseClient {
    
    client: PocketBase;
    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }

    

    async authenticate(email: string, password: string) {
        try {
            const result = await this.client.collection("users").authWithPassword(email, password);
            console.log('authenticate result:', result);
            if (!result?.token) {
                throw new Error("Invalid email or password");
            }
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }

    async register(email: string, password: string) {
        try {
            const result = await this.client.collection("users").create({
                email: email,
                password: password,
                passwordConfirm: password,
            });
            console.log(`register result:`, result) 

            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Failed to register")
        }
    }

    async isAuthenticated(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.isValid || false
    }

    async getUser(cookieStore: ReadonlyRequestCookies) {
        const cookie = cookieStore.get('pb_auth');
        if (!cookie) {
            return false;
        }

        this.client.authStore.loadFromCookie(cookie?.value || '');
        return this.client.authStore.model as User;
    }

    async getEvents() {
        const events = await this.client.collection("events").getFullList({
            sort: "-created", expand: "description",
        })
        return events;
    }

    async getEventbyTitle(title: string) {
        const events = await this.client.collection("events").getFirstListItem(`title="${title}"`);
        return events;
    }

    async submitForm(text: string, hours: number, date: Date, eventId: string, img: File, userId: string) {
        const result = await this.client.collection("forms").create({
            content: text,
            hours: hours,
            date: date,
            event: eventId,
            user: userId,
            image: img,
        });
        return result;
    }
}

export const db = new DatabaseClient();

export default db;