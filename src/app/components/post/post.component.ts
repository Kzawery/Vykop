import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
   MASNO: string ="";
   chuj = "chuj";
  constructor() {
    this.MASNO = "CHuj";
    this.chuj="noino";
    console.log("const")}

  ngOnInit(): void {

  }
  clickMessage = '';
  postFun(): void {
    console.log(this.MASNO);
    console.log(this.chuj);
    console.log("Tutaj bedzie wysyłanie posta");
  }
}
