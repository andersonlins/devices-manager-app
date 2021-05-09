import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './components/pages/category/category.component';
import { DevicesComponent } from './components/pages/devices/devices.component';

const routes: Routes = [
  { path: 'devices', component: DevicesComponent },
  { path: '', redirectTo: '/devices', pathMatch: 'full' },
  { path: 'categories', component: CategoryComponent },
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
