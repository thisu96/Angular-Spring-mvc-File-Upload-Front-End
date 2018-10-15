import { Injectable } from '@angular/core';
import { Customer } from '../dtos/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export const MAIN_URL= "http://localhost:8080";
const URL="/api/v1/customer";

@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }

  saveCustomer(customer: Customer): Observable<boolean>{
    console.log("itemService");
    return this.http.post<boolean>(MAIN_URL + URL,customer);
  }
}
