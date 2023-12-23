interface User {
  name: string;
  email: string;
  picture: string;
  google_identifier: string;
  role: string;
}

interface UserFull extends User, Doc {}
