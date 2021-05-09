import { DevicesService } from '@services/devices.service';
import { CategoryModel } from '@models/category.model';
import { CategoriesService } from './../../../core/services/categories.service';
import { DeviceModel } from '@models/device.model';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';


interface DeviceViewModel extends DeviceModel{
  category?: any;
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html'
})
export class DevicesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'color', 'partNumber', 'category'];
  devices: DeviceViewModel[] = [];
  categories: CategoryModel[] = [];
  categoriesMap: any;
  constructor(private catService: CategoriesService, private devService: DevicesService) { }

  ngOnInit() {
    this.devices.push({
      id: 1,
      name: 'Redmi note 7',
      color: '#eee',
      partNumber: 7987987,
      categoryId: 1
    })
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
      });
    } catch (error) {

    }
  }
}
