import {Component, Inject, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  public formData = new FormData();
  public files: NgxFileDropEntry[] = [];
  isLoading = false;

  constructor(private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<PostAddComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        // @ts-ignore
        fileEntry.file((file: File) => {
          this.isLoading = true;
          this.formData.append('file', file, droppedFile.relativePath);
          // this.iamgeService.create(this.formData).subscribe(x => {
          //     this.dialogRef.close();
          //     this.isLoading = false,
          //       this._snackBar.open('Image have been added', 'hide',  {
          //         duration: 2000,
          //       }); },
          //   error => {
          //     this.isLoading = false;
          //     this._snackBar.open('File is not an image', 'hide',  {
          //       duration: 2000,
          //     });
          //   });
        });
      }
    }
  }
}
