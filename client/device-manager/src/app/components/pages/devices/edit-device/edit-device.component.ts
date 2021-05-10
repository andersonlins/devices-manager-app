import { CategoryModel } from '@models/category.model';
import { DeviceModel } from '@models/device.model';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-device',
  styleUrls: ['./edit-device.component.scss'],
  templateUrl: 'edit-device.component.html'
})

export class EditDeviceComponent implements OnInit {


  selectedDevice: DeviceModel | null = null;
  categories: CategoryModel[] = [];
  deviceForm: FormGroup;

  @Output()
  onCancelEdit = new EventEmitter<any>();
  @Output()
  onSaveDevice = new EventEmitter<any>();

  submitted = false;

  constructor(public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.selectedDevice = data?.device;
    this.categories = data?.categories || [];
    this.deviceForm = this.fb.group({});
  }

  ngOnInit() {
    this.submitted = false;
    this.deviceForm = this.fb.group({
      color: this.fb.control(this.selectedDevice?.color, [Validators.required,Validators.pattern(/^[a-z]{1,16}$/i)]),
      categoryId: this.fb.control(this.selectedDevice?.categoryId, [Validators.min(1)]),
      partNumber: this.fb.control(this.selectedDevice?.partNumber, [Validators.min(1), Validators.pattern(/^\d+$/)])
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
  save() {
    this.submitted = true;
    this.deviceForm.markAllAsTouched();
    if (!this.deviceForm.valid) {
      return;
    }
    const editedDevice = { ...this.selectedDevice, ...this.deviceForm.value};
    this.dialogRef.close(editedDevice);
    this.submitted = false;
  }
}
