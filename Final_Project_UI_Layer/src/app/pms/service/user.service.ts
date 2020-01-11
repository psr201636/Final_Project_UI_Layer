import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  addUserUrl: string = "http://localhost:8081/project-manager/v1/add-user";
  getUsersUrl: string = "http://localhost:8081/project-manager/v1/users";
  updateUserUrl: string = "http://localhost:8081/project-manager/v1/update-user";
  deleteUserUrl: string = "http://localhost:8081/project-manager/v1/users/delete/";

  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addUser(user: User) {
    return this.httpClient.post<User>(this.addUserUrl, user, { headers: this.headers });
  }

  getUsers() {
    return this.httpClient.get<User[]>(this.getUsersUrl);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(this.updateUserUrl, user, { headers: this.headers });
  }

  deleteUser(userId: number) {
    return this.httpClient.delete(this.deleteUserUrl + userId);
  }
}
