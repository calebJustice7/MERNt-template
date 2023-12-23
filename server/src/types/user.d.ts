interface User {
    name: string;
    email: string;
    picture: string;
    google_identifier: string;
    role: ObjectId | string;
}

interface UserFull extends User, Doc {}
