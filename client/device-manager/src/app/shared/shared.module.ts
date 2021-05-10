import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PageHeaderComponent } from './page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTableModule,
  ],
  exports: [PageHeaderComponent],
  declarations: [PageHeaderComponent],
  providers: [],
})
export class SharedModule { }
