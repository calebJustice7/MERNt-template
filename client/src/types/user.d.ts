interface User {
  name: string;
  email: string;
  picture: string;
  google_identifier: string;
  role: string;
}

interface UserWithRole extends User {
  full_role: RoleFull;
}

interface UserFull extends User, Doc {}
