import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { DeviceModel } from './../models/device.model';

@Injectable({providedIn: 'root'})
export class DevicesService extends BaseService<DeviceModel> {
  constructor(private http: HttpClient) {
    super(environment.api.paths.devices, http);
  }
}
