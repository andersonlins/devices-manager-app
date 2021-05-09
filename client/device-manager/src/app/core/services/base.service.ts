import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseModel } from './../models/base.model';

export class BaseService<T extends BaseModel> {
  private path: string;
  private client: HttpClient;

  constructor(path: string, http: HttpClient) {
    if (!path) {
      throw new Error('missing path');
    }
    this.path = path;
    this.client = http;
  }

  list(): Observable<T[]>{
    return this.client.get<T[]>(environment.api.baseUrl + this.path);
  }
  delete(id: number) {
    return this.client.delete<T>(environment.api.baseUrl + this.path + '/' + id);
  }
  save(model: T): Observable<any> {
    if (!model) {
      throw new Error('empty model');
    }
    if (!model.id) {
      return this.client.post<any>(environment.api.baseUrl + this.path, model);
    } else {
      return this.client.put<any>(environment.api.baseUrl + this.path, model);
    }
  }
}
