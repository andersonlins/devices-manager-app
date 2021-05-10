import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { CategoryModel } from './../models/category.model';

@Injectable({providedIn: 'root'})
export class CategoriesService extends BaseService<CategoryModel> {
  constructor(private http: HttpClient) {
    super(environment.api.paths.categories, http);
  }
}
