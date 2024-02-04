import PocketBase from 'pocketbase';

const POCKET_BASE_URL = 'https://impact-track.pockethost.io/'

export class DatabaseClient {
    client: PocketBase;

    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }
}

export const db = new DatabaseClient();

export default db;