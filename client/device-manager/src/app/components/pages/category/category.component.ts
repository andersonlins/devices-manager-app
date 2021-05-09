import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '@models/category.model';
import { CategoriesService } from './../../../core/services/categories.service';

interface CategoryViewModel extends CategoryModel{
  category?: any;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name'];
  categories: CategoryViewModel[] = [];

  constructor(private catService: CategoriesService) { }

  ngOnInit(): void {
    this.populate();
  }

  private async populate() {
    try {
     this.catService.list()
      .subscribe((res) => {
        this.categories = res as CategoryViewModel[];
      });
    } catch (error) {
      console.log(error);
    }
  }
}
