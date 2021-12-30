export default interface AuthenticatedUser {
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