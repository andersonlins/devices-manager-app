import { SNACK_PRESETS } from './../../../core/utils';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from '@models/category.model';
import { ModalConfirmComponent } from '../../modal-confirm/modal-confirm.component';
import { CategoriesService } from './../../../core/services/categories.service';
import { EditCategoryComponent } from './edit-category/edit-category.component';

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
          this.snackBar.open('Removido com sucesso', undefined, SNACK_PRESETS.SUCCESS);
          setTimeout(() => {
            this.populate();
          }, 800);
        }, () => {
          this.snackBar.open('Erro ao remover', undefined, SNACK_PRESETS.ERROR);
        })
      }
    });
  }

  addCategory() {
    this.editCategory({id: 0, name: ''});
  }

  editCategory(category: CategoryViewModel) {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '350px',
      data: {
        category: category,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'cancel') {
        return;
      }
      setTimeout(() => {
        this.populate();
      }, 800);
    });
  }
}
