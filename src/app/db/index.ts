import PocketBase from 'pocketbase';

const POCKET_BASE_URL = process.env.POCKET_BASE_URL;

export class DatabaseClient {
    client: PocketBase;

    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }

    async getEvents() {
        const events = await this.client.collection("events").getFullList({
            sort: "-created", expand: "description",
        })
        return events;
    }
}

export const db = new DatabaseClient();

export default db;