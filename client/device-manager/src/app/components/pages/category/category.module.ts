import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryComponent } from './category.component';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    EditCategoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
  ]
})
export class CategoryModule { }
