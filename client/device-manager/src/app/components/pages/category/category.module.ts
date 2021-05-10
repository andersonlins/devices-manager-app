import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { CategoryComponent } from './category.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    EditCategoryComponent,
    CategoryComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
  ]
})
export class CategoryModule { }
