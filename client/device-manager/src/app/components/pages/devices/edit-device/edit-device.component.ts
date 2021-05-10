import { CategoryModel } from '@models/category.model';
import { DeviceModel } from '@models/device.model';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevicesService } from '@services/devices.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_PRESETS } from 'src/app/core/utils';
import { CategoriesService } from '@services/categories.service';

@Component({
  selector: 'app-edit-device',
  styleUrls: ['./edit-device.component.scss'],
  templateUrl: 'edit-device.component.html'
})

export class EditDeviceComponent implements OnInit {


  selectedDevice: DeviceModel | null = null;
  categories: CategoryModel[] = [];
  deviceForm: FormGroup;

  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<EditDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private devService: DevicesService,
    private catService: CategoriesService,
    private snackBar: MatSnackBar) {
    this.selectedDevice = data?.device;
    this.deviceForm = this.fb.group({});
  }

  ngOnInit() {
    this.getCategories();
    this.deviceForm = this.fb.group({
      color: this.fb.control(this.selectedDevice?.color, [Validators.required,Validators.pattern(/^[a-z]{1,16}$/i)]),
      categoryId: this.fb.control(this.selectedDevice?.categoryId, [Validators.min(1)]),
      partNumber: this.fb.control(this.selectedDevice?.partNumber, [Validators.min(1), Validators.pattern(/^\d+$/)])
    });
  }

  private async getCategories() {
    try {
      this.catService.list().subscribe((res) => {
        this.categories = res;
      }, (err) => {
        this.categories = [];
        this.snackBar.open('Erro ao carregar dados', undefined, SNACK_PRESETS.ERROR);
      });
    } catch (error) {
      this.categories = [];
      this.snackBar.open('Erro ao carregar dados', undefined, SNACK_PRESETS.ERROR);
    }
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
  
  save() {
    this.deviceForm.markAllAsTouched();
    if (!this.deviceForm.valid) {
      return;
    }
    const editedDevice = { ...this.selectedDevice, ...this.deviceForm.value};

    this.devService.save(editedDevice).subscribe(res => {
      const msg = res.id ? 'Salvo com sucesso' : 'Adicionado com sucesso';
      this.snackBar.open(msg, undefined, SNACK_PRESETS.SUCCESS);
    },() => {
      this.snackBar.open('Erro ao salvar', undefined, SNACK_PRESETS.ERROR);
    });

    this.dialogRef.close(editedDevice);
  }
}
