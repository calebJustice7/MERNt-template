interface User {
    name: string;
    email: string;
    picture: string;
    google_identifier: string;
    permissions: [];
}

interface UserFull extends User, Doc {}
