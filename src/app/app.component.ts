import { Component, OnInit,ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { ServiceService } from './shared/service.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'
import { error } from 'console';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  displayedColumns: string[] = ['id', 'firstname', 'email', 'dob','package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ServiceService){
  }

ngOnInit(): void {
  this.getUserList()
}

  openAddEdit(){
   const dialogRef = this.dialog.open(AddEditUserComponent)
     dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getUserList();
        }
      }
     })
  }
  editUser(data:any){
    const dialogRef = this.dialog.open(AddEditUserComponent,{
    data,
  });
  dialogRef.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getUserList();
      }
    }
  });
 }

  getUserList(){
    this.service.getAllUser().subscribe({
      next:(res)=>{
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      },
      error:(err)=>{
        alert(err);
      }
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   deleteUser(id:number){
    this.service.deleteUser(id).subscribe({
      next:(res)=>{
      alert("user deleted success 😐")
      this.getUserList();
      },
      error: console.log,
    })
   }
}
