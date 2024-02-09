export interface User {
    id: string;
    username: string;
    email: string;
    name: string;
    created: string;
    updated: string;
    avatar: string;
    role: string;
    events: string[];
  }

export interface Form {
    id: string;
    text: string;
    hours: number;
    date: string;
    event: string;
    image: string;
    user: User;
    created: string;
    updated: string;
}
export interface Event {
    id: string;
    title: string;
    description: string;
    users: User[];
    forms: Form[];
    created: string;
    updated: string;
}