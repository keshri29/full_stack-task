import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.css'
})
export class AddEditUserComponent implements OnInit {
userForm:FormGroup;

 education :string[]= ['Matric', 'Diploma','Btech','Eng']

 constructor(private fb:FormBuilder, private service: ServiceService, private dialogref:MatDialogRef<AddEditUserComponent>,
  @Inject (MAT_DIALOG_DATA) public data:any)
 {
  this.userForm = this.fb.group({
    firstname:'',
    fathername:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    exp:'',
    package:''
  })
 }
  ngOnInit(): void {
    this.userForm.patchValue(this.data)
  }
 onFormSubmit(){
  if(this.userForm.valid){
    // console.warn(this.userForm.value)
    if(this.data){
      this.service.updateUser(this.data.id, this.userForm.value).subscribe({
        next: (val:any)=>{
       alert("user updated successfully😊")
       this.dialogref.close(true);
        }, 
        error: (err:any)=>{
          alert(err);
        }
      })
    }
    else{
       this.service.addUser(this.userForm.value).subscribe({
      next: (val:any)=>{
     alert("user added success 😊")
     this.dialogref.close()
      }, 
      error: (err:any)=>{
        alert(err);
      }
    })
    }
   
  }
 }
}
