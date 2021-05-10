import { CategoryModel } from '@models/category.model';
import { DeviceModel } from '@models/device.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-device',
  styleUrls: ['./edit-device.component.scss'],
  templateUrl: 'edit-device.component.html'
})

export class EditDeviceComponent implements OnInit {

  @Input()
  selectedDevice: DeviceModel | null = null;
  @Input()
  categories: CategoryModel[] = [];
  deviceForm: FormGroup;

  @Output()
  onCancelEdit = new EventEmitter<any>();
  @Output()
  onSaveDevice = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.deviceForm = this.fb.group({
      color: this.fb.control('', [Validators.pattern(/^[a-z]{1,16}$/i)]),
      categoryId: this.fb.control(0, [Validators.min(1)]),
      partNumber: this.fb.control(0, [Validators.min(1), Validators.pattern(/^\d+$/)])
    });
  }

  ngOnInit() {
  }

  cancel() {
    this.onCancelEdit.emit();
  }
  save() {
    this.onSaveDevice.emit(this.deviceForm.value);
  }
}
