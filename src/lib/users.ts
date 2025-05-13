export type UserRole = "admin" | "user";

export interface User {
    id: string;
    email: string;
    password: string; // Normalde hash edilmiş olurdu
    role: UserRole;
    emailVerified: boolean;
    name: string; // Kullanıcının gerçek adı
}

export const users: User[] = [
    {
        id: "1",
        email: "admin@dgd.com",
        password: "admin123",
        role: "admin",
        emailVerified: true,
        name: "Dr. Mehmet Yılmaz"
    },
    {
        id: "2",
        email: "ayse.demir@dgd.com",
        password: "password123",
        role: "user",
        emailVerified: true,
        name: "Prof. Ayşe Demir"
    },
    {
        id: "3",
        email: "can.ozkan@dgd.com",
        password: "writer456",
        role: "user",
        emailVerified: true,
        name: "Mühendis Can Özkan"
    },
    {
        id: "4",
        email: "zehra.aktas@dgd.com",
        password: "zehra123",
        role: "user",
        emailVerified: true,
        name: "Dr. Zehra Aktaş"
    },
    {
        id: "5",
        email: "ali.kaya@dgd.com",
        password: "ali456",
        role: "user",
        emailVerified: true,
        name: "Prof. Dr. Ali Kaya"
    },
    {
        id: "6",
        email: "zeynep.yucel@dgd.com",
        password: "zeynep789",
        role: "user",
        emailVerified: false,
        name: "Zeynep Yücel"
    },
    {
        id: "7",
        email: "emre.karagoz@dgd.com",
        password: "emre321",
        role: "user",
        emailVerified: true,
        name: "Emre Karagöz"
    },
    {
        id: "8",
        email: "aylin.ozdemir@dgd.com",
        password: "aylin654",
        role: "user",
        emailVerified: true,
        name: "Aylin Özdemir"
    },
    {
        id: "9",
        email: "oguz.serdar@dgd.com",
        password: "oguz987",
        role: "user",
        emailVerified: true,
        name: "Oğuz Serdar"
    },
    {
        id: "10",
        email: "selin.aktas@dgd.com",
        password: "selin111",
        role: "user",
        emailVerified: false,
        name: "Selin Aktaş"
    }
];