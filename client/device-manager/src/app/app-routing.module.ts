import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCategoryComponent } from './category/list-category/list-category.component';

const routes: Routes = [
  { path: 'devices', component: DevicesComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'category', component: ListCategoryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
