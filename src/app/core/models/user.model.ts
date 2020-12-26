export class AppUser {
  logged: boolean;
  details: User;

  constructor(logged: boolean, details: User) {
    this.logged = logged;
    this.details = details;
  }

  static unloggedUser() {
    return new AppUser(false, null);
  }

  static loggedUser(details: User) {
    return new AppUser(true, details);
  }

}

export class UserUpdateRequest {
  name: string;
  surname: string;
  phone: string;
}

export interface User {
  id: number;
  email: string;
  phone: string;
  name: string;
  surname: string;
  role: string;
  status: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}
