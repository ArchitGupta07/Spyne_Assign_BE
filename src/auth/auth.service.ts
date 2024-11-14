import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AuthService {
  constructor(private readonly databaseService: DatabaseService) {}

  login(loginDto: any) {
    // Implement login logic (e.g., JWT authentication)
    return { message: 'User logged in', data: loginDto };
  }

  register(registerDto: any) {
    // Implement registration logic
    return { message: 'User registered', data: registerDto };
  }
}
