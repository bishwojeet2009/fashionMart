import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CardItem, ProductItem } from '../interface/product';
import { UserInfo } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiBase: String = 'https://fakestoreapi.com'

  constructor(private http: HttpClient) { }



  public getAllProduct(category: string = '') {
    const headers = new HttpHeaders().set("Content-Type", "application/json")
    return this.http.get<ProductItem[]>(this.apiBase + `/products/${category}`, {
      headers: headers
    })
  }


  public getProduct(id: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get<ProductItem>(this.apiBase + `/products/${id}`, {
      headers: headers
    })

  }

  public registerUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    city: string,
    street: string,
    zipcode: string,
    number: string
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post(this.apiBase + '/users', {
      email: email,
      username: email,
      password: password,
      name: {
        firstname: firstName,
        lastname: lastName
      },
      address: {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
        geolocation: {
          lat: '',
          long: ''
        }
      },
      phone: phone
    },
      {
        headers: headers
      })
  }
  public updateUser(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
    city: string,
    street: string,
    zipcode: string,
    number: string,
    id: number
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.patch(this.apiBase + `/users/${id}`, {
      email: email,
      username: email,
      password: password,
      name: {
        firstname: firstName,
        lastname: lastName
      },
      address: {
        city: city,
        street: street,
        number: number,
        zipcode: zipcode,
        geolocation: {
          lat: '',
          long: ''
        }
      },
      phone: phone
    },
      {
        headers: headers
      })
  }

  public userLogin(email: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.post<{ token: string }>(this.apiBase + '/auth/login', {
      username: email,
      password: password
    }, {
      headers: headers
    })
  }

  public getUser(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get<UserInfo>(this.apiBase + `/users/${id}`, {
      headers: headers
    })
  }

  public deleteUser(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.delete(this.apiBase + `/users/${id}`, {
      headers: headers
    })

  }

  public getCartItem(id: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this.http.get<CardItem[]>(this.apiBase + `/carts/user/${id}`, {
      headers: headers
    })
  }







}
