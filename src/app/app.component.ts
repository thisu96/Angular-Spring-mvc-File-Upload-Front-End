import { Component, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { Customer } from './dtos/customer';
import { FileService } from './services/file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SPRING MVC - ANGULAR 6 FILE UPLOAD EXAMPLE';

  constructor(private customerService: CustomerService, private fileService: FileService){}

  selectedCustomer: Customer = new Customer();
  @ViewChild('fileInput') inputEl: ElementRef;
  size: string;

  upload() {
    console.log("upload")
    let inputEl: HTMLInputElement = this.inputEl.nativeElement;
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) { // a file was selected
        let customer: Customer = new Customer();
        formData.append('file', inputEl.files.item(0), inputEl.files.item(0).name);
        this.size = (inputEl.files.item(0).size / 1024 / 1024).toFixed(2)
        this.fileService.uploadFile(formData)

        this.selectedCustomer.imageUrl = inputEl.files.item(0).name; // database imageurl column ekata image name eka set karana thana
        console.log(this.selectedCustomer)
        this.customerService.saveCustomer(this.selectedCustomer).subscribe(
            (result)=>{
                if (result){
                        //this.items = new Array();
                          alert("Congrats! You Sussefully Registerd..")
                }else{
                  alert("OOps! Something wents wrong..")
                }
            }
        )
    }
  }
}
