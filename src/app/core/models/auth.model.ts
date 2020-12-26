export class LoginCredentials {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class TokenInfo {
  accessToken: string;
  refreshToken: string;

  static empty() {
    return new TokenInfo();
  }
}

export class RegisterData {
  name: number;
  surname: string;
  email: string;
  password: string;
  phone: string;
  invitationCode: string;
}

export class RegistrationResponse {
  success: boolean;
  emailExists: boolean;
  phoneExists: boolean;
}
