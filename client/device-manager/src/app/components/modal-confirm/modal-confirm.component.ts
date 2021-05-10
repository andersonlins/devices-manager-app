import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: 'modal-confirm.component.html'
})

export class ModalConfirmComponent implements OnInit {

  @Input()
  title = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title;
  }

  ngOnInit() { }
}
