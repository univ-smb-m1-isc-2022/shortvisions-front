import { Injectable } from '@angular/core';

export type User = {
  id: number | null,
  token: string,
  email: string,

}
@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User;
  constructor() { }

  getUser() {
    const user = {
      id: sessionStorage.getItem('user') as unknown as number,
      token: sessionStorage.getItem('token') as string,
      email: sessionStorage.getItem('email') as string,
    } as User;
    return user;
  }
  setUser(user: User) {
    this.currentUser = user;
  }
}
