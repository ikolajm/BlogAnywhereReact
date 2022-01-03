export default interface AuthenticatedUser {
    id: number | null,
    uuid: string | null;
    name: string;
    email: string;
    username: string;
    avatar: string;
    bio: string;
    token: string | null;
    // created: any;
    // updated: any;
}