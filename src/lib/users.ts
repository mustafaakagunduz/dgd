export type UserRole = "admin" | "user";

export interface User {
    id: string;
    email: string;
    password: string; // Normalde hash edilmiş olurdu
    role: UserRole;
}

export const users: User[] = [
    {
        id: "1",
        email: "admin@dgd.com",
        password: "admin123",
        role: "admin"
    },
    {
        id: "2",
        email: "john@example.com",
        password: "password123",
        role: "user"
    },
    {
        id: "3",
        email: "writer@tech.com",
        password: "writer456",
        role: "user"
    }
];