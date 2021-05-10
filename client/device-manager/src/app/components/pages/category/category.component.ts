import { SNACK_PRESETS } from './../../../core/utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from '@models/category.model';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
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
  displayedColumns: string[] = ['id', 'name', 'actions'];
  categories: CategoryViewModel[] = [];

  constructor(private catService: CategoriesService,
    public dialog: MatDialog, private snackBar: MatSnackBar) { }

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
  deleteCategory(category: CategoryViewModel) {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      data: {
        title: 'Deseja remover "' + category.name + '"?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.catService.delete(category.id).subscribe(res => {
          this.categories = this.categories.filter( d => d.id !== category.id);
          this.snackBar.open('Removido com sucesso', undefined, SNACK_PRESETS.SUCCESS);
        }, () => {
          this.snackBar.open('Erro ao remover', undefined, SNACK_PRESETS.ERROR);
        })
      }
    });
  }
}
