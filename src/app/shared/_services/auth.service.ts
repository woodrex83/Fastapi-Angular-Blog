import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getUserDetails() {
    let receiveData: any = localStorage.getItem('username');
    return receiveData ? JSON.parse(receiveData) : null;
  }

  setDataInLocalStorage(variableName: any, data: any) {
    localStorage.setItem(variableName, data);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  // 這個可能需要移到api
  getCurrentPost() {
    let content:any = localStorage.getItem('content');
    return content ? JSON.parse(content) : null;
  }

  clearStorage() {
    localStorage.clear();
  }
}
