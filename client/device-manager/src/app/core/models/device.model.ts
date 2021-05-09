import { BaseModel } from './base.model';

export interface DeviceModel extends BaseModel {
  id: number;
  categoryId: number;
  name: string;
  color: string;
  partNumber: number;
}
