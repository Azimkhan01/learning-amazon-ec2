import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

     async getUsers(): Promise<any> {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return await response.json();
  }

  async getUsersByID(id:number): Promise<any> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    return await response.json();
  }

}
