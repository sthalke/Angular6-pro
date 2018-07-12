import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-tc-dialog',
  templateUrl: 'tcPopup.component.html',
  styleUrls: ['./tcPopup.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class TCDialog implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private mdDialogRef: MatDialogRef<TCDialog>
  ) { }

  ngOnInit() {}
  
  closeDialog() {
    this.mdDialogRef.close(true);
  }
}
