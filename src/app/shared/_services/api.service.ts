import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // IP of backend
  private REST_API_SERVER = environment.REST_API_SERVER;
  // private REST_API_SERVER = "http://localhost:8003/";
  constructor(private httpClient: HttpClient) { }

  getTypeRequest(url: any) {
    return this.httpClient.get(this.REST_API_SERVER+url).pipe(map(res => {
      return res;
    }));
  }

  postTypeRequest(url: any, payload: any) {
    return this.httpClient.post(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }));
  }

  putTypeRequest(url: any, payload: any) {
    return this.httpClient.put(this.REST_API_SERVER+url, payload).pipe(map(res => {
      return res;
    }))
  }

  deleteTypeRequest(url: any) {
    return this.httpClient.delete(this.REST_API_SERVER+url).pipe(map(res => {
      return res;
    }))
  }
}
