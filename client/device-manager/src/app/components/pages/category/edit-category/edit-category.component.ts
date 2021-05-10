import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from '@models/category.model';
import { CategoriesService } from '@services/categories.service';
import { SNACK_PRESETS } from 'src/app/core/utils';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  selectedCategory: CategoryModel | null = null;
  categories: CategoryModel[] = [];
  categoryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private catService: CategoriesService,
    private snackBar: MatSnackBar
  ) {
    this.selectedCategory = data?.category;
    this.categoryForm = this.fb.group({});
   }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: this.fb.control(this.selectedCategory?.name, [Validators.required,Validators.pattern(/^[a-z0-9\s+]{1,128}$/i)]),
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
  
  save() {
    this.categoryForm.markAllAsTouched();
    if (!this.categoryForm.valid) {
      return;
    }
    const editedCategory = { ...this.selectedCategory, ...this.categoryForm.value};

    this.catService.save(editedCategory).subscribe(res => {
      const msg = res.id ? 'Salvo com sucesso' : 'Adicionado com sucesso';
      this.snackBar.open(msg, undefined, SNACK_PRESETS.SUCCESS);
    },() => {
      this.snackBar.open('Erro ao salvar', undefined, SNACK_PRESETS.ERROR);
    });

    this.dialogRef.close(editedCategory);
  }

}
