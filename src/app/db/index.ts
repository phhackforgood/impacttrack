import PocketBase from 'pocketbase';

const POCKET_BASE_URL = process.env.POCKET_BASE_URL;

export class DatabaseClient {
    client: PocketBase;

    constructor() {
        this.client = new PocketBase(POCKET_BASE_URL);
        this.client.autoCancellation(false);
    }

    async authenticate(email : string, password: string) {
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

    async register(username: string, email: string, password:string) {
        try {
            const result = await this.client.collection("users").create({
                email: email,
                password: password,
                passwordConfirm: password,
            });
            console.log('register result:', result);
            return result;
        } catch (err) {
            console.error(err);
            throw new Error("Invalid email or password");
        }
    }
}



export const db = new DatabaseClient();

export default db;