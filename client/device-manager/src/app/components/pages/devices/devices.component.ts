import { EditDeviceComponent } from './edit-device/edit-device.component';
import { SNACK_PRESETS } from './../../../core/utils';
import { DevicesService } from '@services/devices.service';
import { CategoryModel } from '@models/category.model';
import { DeviceModel } from '@models/device.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
import { MatSnackBar } from '@angular/material/snack-bar';


interface DeviceViewModel extends DeviceModel{
  category?: any;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'color', 'partNumber', 'category', 'actions'];
  devices: DeviceViewModel[] = [];
  categories: CategoryModel[] = [];
  categoriesMap: any;
  selectedDevice: DeviceModel | null = null;

  constructor(
    private devService: DevicesService,
    public dialog: MatDialog, 
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.populate();
  }

  private async populate() {
    try {
      this.devService.list().subscribe((res) => {
        this.devices = res;
      }, (err) => {
        this.devices = [];
        this.categories = [];
        this.snackBar.open('Erro ao carregar dados', undefined, SNACK_PRESETS.ERROR);
      });
    } catch (error) {
      this.devices = [];
      this.categories = [];
      this.snackBar.open('Erro ao carregar dados', undefined, SNACK_PRESETS.ERROR);
    }
  }
  deleteDevice(device: DeviceViewModel) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Deseja remover o dispositivo?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.devService.delete(device.id).subscribe(res => {
            setTimeout(() => {
              this.populate();
            }, 800);
            this.snackBar.open('Removido com sucesso', undefined, SNACK_PRESETS.SUCCESS);
          }, () => {
            this.snackBar.open('Erro ao remover', undefined, SNACK_PRESETS.ERROR);
          })
      }
    });
  }
  addNewDevice() {
    this.editDevice({
      id: 0,
      color: '',
      categoryId: 0,
      partNumber: 0
    });
  }

  editDevice(device: DeviceViewModel) {
    const dialogRef = this.dialog.open(EditDeviceComponent, {
      width: '350px',
      data: {
        device: device,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
      setTimeout(() => {
        this.populate();
      }, 800);
    });
  }

  
}
