import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DevicesComponent } from './components/pages/devices/devices.component';
import { DevicesService } from './core/services/devices.service';
import { CategoriesService } from './core/services/categories.service';
import { CategoryModule } from './components/pages/category/category.module';

@NgModule({
  declarations: [
    AppComponent,
    DevicesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoryModule
  ],
  exports: [
    MatSidenavModule,
  ],
  providers: [DevicesService, CategoriesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
