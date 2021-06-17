import { Component, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {HttpResponse} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {UserService} from '../../../services/user.service';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../../models/user';
import {DeleteDialogComponent} from '../../delete-dialog/delete-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserManagamentComponent} from '../user-managament/user-managament.component';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('void', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('*', style({ height: '*', visibility: 'visible' })),
      transition('void <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserListComponent implements OnInit {

  constructor(private userSerivece: UserService, private http: HttpClient, private router: Router, public dialog: MatDialog) { }

  title = '';
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['id', 'username', 'registrationDate', 'role'];
  expandedElement: User | null;
  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  isExpansionDetailRow = (index, row) => row.hasOwnProperty('detailRow');
  ngOnInit() {
    this.reloadData();
  }
  reloadData() {
    this.userSerivece.getAll().subscribe(data => {
      this.dataSource =  new MatTableDataSource<User>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  editUser(id: number) {
    const dialogRef = this.dialog.open(UserManagamentComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {id: id},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadData();
    });
  }
  createUser() {
    const dialogRef = this.dialog.open(UserManagamentComponent, {
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.reloadData();
    });
  }

  deleteUser(user_id: number) {
    this.userSerivece.deleteById(user_id).subscribe(data => {
      this.reloadData();
    });
  }

  openDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      disableClose: true,
      hasBackdrop: true,
      data: {id: id, model: 'User'},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUser(id);
        this.reloadData();
      }
    });
  }

}
