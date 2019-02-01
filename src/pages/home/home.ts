import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name:any;
  items:any;

  constructor(public navCtrl: NavController,public http: HttpClient) {

    this.http.get('http://localhost:8888/get').subscribe(data=>{
         this.items=data;
         console.log(data);
    })

  }
  add(){
    console.log(this.name);

    var body = {
      todo:this.name,
    }
    this.http.post('http://localhost:8888/create',body).subscribe(data=>{
      console.log(data);
    });
  }

}
