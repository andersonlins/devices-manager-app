import { SNACK_PRESETS } from './../../../core/utils';
import { DevicesService } from '@services/devices.service';
import { CategoryModel } from '@models/category.model';
import { CategoriesService } from './../../../core/services/categories.service';
import { DeviceModel } from '@models/device.model';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  displayedColumns: string[] = ['id', 'name', 'color', 'partNumber', 'category', 'actions'];
  devices: DeviceViewModel[] = [];
  categories: CategoryModel[] = [];
  categoriesMap: any;
  selectedDevice: DeviceModel | null = null;

  constructor(private catService: CategoriesService, private devService: DevicesService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.populate();
  }

  private async populate() {
    try {
      const listAll: any[] = [this.devService.list(), this.catService.list()];
      forkJoin(listAll)
      .subscribe((res) => {
        console.log('res', res);
        this.devices = res[0] as any;
        this.categories = res[1] as any;
        this.categoriesMap = {};
        this.categories.forEach(cat => this.categoriesMap[cat.id] = cat);
        this.devices.forEach(dev => {
          dev.category = this.categoriesMap[dev.categoryId] || this.categoriesMap[1];
        });
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
    console.log(`try to delete`, device);
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Deseja remover o dispositivo?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.devService.delete(device.id).subscribe(res => {
          this.devices = this.devices.filter( d => d.id !== device.id);
          this.snackBar.open('Removido com sucesso', undefined, SNACK_PRESETS.SUCCESS);
        }, () => {
          this.snackBar.open('Erro ao remover', undefined, SNACK_PRESETS.ERROR);
        })
      }
    });
  }
  saveDevice(device: DeviceViewModel) {
    this.devService.save(device).subscribe(res => {
      this.snackBar.open('Salvo', undefined, SNACK_PRESETS.SUCCESS);
      this.populate();
      this.selectedDevice = null;
    },() => {
      this.snackBar.open('Erro ao salvar', undefined, SNACK_PRESETS.ERROR);
      this.selectedDevice = null;
    });
  }
}
