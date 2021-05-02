import {Component, OnInit} from '@angular/core';
import {FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import {SubVykop} from '../../models/subVykop';
import {MatDialogRef} from '@angular/material/dialog';
import {SubvykopService} from '../../services/subvykop.service';

@Component({
  selector: 'app-add-sub-vykop',
  templateUrl: './add-sub-vykop.component.html',
  styleUrls: ['./add-sub-vykop.component.css']
})
export class AddSubVykopComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddSubVykopComponent>, public subvykopService: SubvykopService) { }
  files;
  subVykop: SubVykop = new SubVykop();
  isLoading = null;
  subVykopForm = new FormData();
  name: string;
  description: string;

  ngOnInit(): void {
  }

  onBack(): void {
    this.dialogRef.close();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          // this.isLoading = true;
          this.subVykopForm.append('banner', file, droppedFile.relativePath);
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.subVykop.banner = reader.result.toString();
            console.log(reader.result.toString());
          };
        });
      }
    }
  }

  onEdit() {
    this.isLoading = true;
    this.subVykopForm.append('name', this.name);
    this.subVykopForm.append('description', this.description);
    console.log(this.subVykopForm.get('name'));
    console.log(this.subVykopForm.get('description'));
    console.log(this.subVykopForm.get('avatar'));
    console.log(this.subVykopForm.get('banner'));
    // console.log(this.subVykop);
     this.subvykopService.create(this.subVykopForm).subscribe(resp => {
       this.isLoading = false;
       this.onBack();
     });
  }


  public dropped2(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
          // this.isLoading = true;
          this.subVykopForm.append('avatar', file, droppedFile.relativePath);
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.subVykop.avatar = reader.result.toString();
            console.log(reader.result.toString());
          };
        });
      }
    }
  }
}
