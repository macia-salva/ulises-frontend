export class LoginDTO {
    username: string;
    password: string;
    newpassword: string;
    device_number: number;
  
    constructor(
      username: string,
      password: string,
      newpassword: string,
      device_number: number

    ) {
      this.username = username;
      this.password = password;
      this.newpassword = newpassword;
      this.device_number = device_number;
    }
  }
  