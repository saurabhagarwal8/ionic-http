import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  name:any;
  items:any=[];

  constructor(public navCtrl: NavController,public http: Http) {

    this.http.get('http://localhost:8888/list').subscribe(data=>{
      if(data)
         this.items=data.json();
         console.log(data.json());
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
