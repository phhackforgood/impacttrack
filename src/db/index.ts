import PocketBase from 'pocketbase';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { User, Event } from '@/types';
import { RecordModel } from 'pocketbase';

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
        return this.client.authStore.model as RecordModel;
    }

    async getEvents() {
        const events = await this.client.collection("events").getFullList({
            sort: "-created", expand: "description",
        })
        return events;
    }

    async getEventbyTitle(title: string) {
        console.log('title: being called', title);
        const events = await this.client.collection("events").getFirstListItem(`title="${title}"`);
        console.log('events:', events);
        return events;
    }

    async submitForm(text: string, hours: number, date: Date, eventId: string, img: File, userId: string) {
        console.log('submitForm: being called');
        console.log('img:', img);
        const data = {
            "user": userId,
            "eventDate": new Date(),
            "content": text,
            "event": eventId,
            "hours": hours,
            "image": img
        }
        const result = await this.client.collection("forms").create(data);
        console.log('submitForm result:', result);
        return result;
    }

    async getEventsForms() {
        const events = await this.client.collection("forms").getFullList({
            sort: "-created", expand: "userList, form",
        });
        return events;
    }

    async getAvatarUrl(model: RecordModel) {
        return this.client.getFileUrl(model, model.avatar);
    }
    
}

export const db = new DatabaseClient();

export default db;