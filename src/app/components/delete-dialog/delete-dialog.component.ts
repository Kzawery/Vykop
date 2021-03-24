import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
// @ts-ignore
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})

export class DeleteDialogComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  id: number = this.data.id;
  model: String = this.data.model;
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
    this._snackBar.open('Deletion have been completed', '', {
      duration: 2000,
    });
  }

  ngOnInit(): void {
  }


}

