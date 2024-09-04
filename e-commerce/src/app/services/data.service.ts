import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  updateCart(arg0: string | null, updatedCartData: any) {
    throw new Error('Method not implemented.');
  }
  public API = "http://localhost:3013/api/"
  constructor(private http: HttpClient) { }

  getproducts() {
    var headers = new HttpHeaders().set('Authorization', `Bearer ${this.getdata("token")}`);
    return this.http.get(this.API + "getproducts", { headers: headers });
  }
  getoneprod(id: any) {
    var headers = new HttpHeaders().set('Authorization', `Bearer ${this.getdata("token")}`);
    return this.http.get(this.API + "prod/" + id, { headers: headers });
  }
  creaeuser(form: any) {
    var headers = new HttpHeaders();
    headers.append("Content-Type", 'application/json');
    var json = {
      "name": form.value.name,
      "email": form.value.email,
      "mobile": form.value.mobile,
      "password": form.value.password
    }
    return this.http.post(this.API + "register", json, { headers: headers })
  }
  checkToken(token: any) {
    var headers = new HttpHeaders();
    headers.append("Content-Type", 'application/json');
    var json = {
      "token": token,
    }
    return this.http.post(this.API + "check", json, { headers: headers })
  }
  loginuser(form: any) {
    var headers = new HttpHeaders();
    headers.append("Content-Type", 'application/json');
    var json = {
      "name": form.value.name,
      "password": form.value.password
    }
    return this.http.post(this.API + "login", json, { headers: headers })
  }
  setdata(data: any, name: string) {
    return localStorage.setItem(name, data)
  }
  getdata(name: string) {
    return localStorage.getItem(name)
  }
  removedata(name: string) {
    return localStorage.removeItem(name)
  }
  addcart(name: any, id: any) {
    var headers = new HttpHeaders().set('Authorization', `Bearer ${this.getdata("token")}`);
    headers.append("Content-Type", 'application/json');
    var json = {
      "userName": name,
      "cartdatas": id
    }
    return this.http.post(this.API + "addcart", json, { headers: headers })
  }
  getcart(name: any) {
    var headers = new HttpHeaders().set('Authorization', `Bearer ${this.getdata("token")}`);
    return this.http.get(this.API + "cart/" + name, { headers: headers })
  }
  updatecart(name: any, data: any) {
    var headers = new HttpHeaders().set('Authorization', `Bearer ${this.getdata("token")}`);
    var json = {
      "name": name,
      "cartdatas": data
    }
    return this.http.post(this.API + "updatecart", json, { headers: headers })
  }
}
