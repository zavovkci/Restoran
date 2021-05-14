import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cmsmenu',
  templateUrl: './cmsmenu.component.html',
  styleUrls: ['./cmsmenu.component.css']
})
export class CmsmenuComponent implements OnInit {
  menus$: Observable<any>;
  courses_id:string="";
  name:string="";
  price:string="";
  currency:string="";
  constructor(public order: OrderService, private http: HttpClient) { }

  ngOnInit(): void {
    this.menus$ = this.order.menusData$.pipe(
      //tap(data => console.log(data.data)),
      map(data => data.data)
    )
  }

  addToMenu(){
    let url1 = "http://localhost:3014/api/menuAddDish";
    this.http.post(url1,{courses_id:this.courses_id, name: this.name, price: this.price, currency: this.currency}).toPromise().then((data:any) => {});
    window.location.reload()
  }
  removeFromMenu(name:any){
    let url1 = "http://localhost:3014/api/menuDeleteSingle";
    this.http.post(url1,{name: name}).toPromise().then((data:any) => {});
    window.location.reload()
  }

}
