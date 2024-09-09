import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { CartList } from 'src/app/interface/product';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './cart.component.scss']
})
export class CartComponent implements OnInit {

  loadingItem: Boolean = false;
  cartItems: any[] = []


  constructor(private api: ApiService, public global: GlobalService) {
    this.loadingItem = true
    this.api.getCartItem(this.global.user.sub)
      .pipe(map(res => {
        let product: any[] = []
        res.map(item => product.push(...item.products))
        return product
      }),
        map(res => {
          let product: any = {};
          console.log(res)
          res.forEach(item => {
            product[item.productId] = (product[item.productId] || 0) + item.quantity
          })
          return product
        }))
      .subscribe(res => {
        console.log(res)
        for (let item in res) {
          this.api.getProduct(item).subscribe(resp => {
            this.cartItems.push({ ...resp, quantity: res[item] })
          },
            (err) => {
              console.warn(err)
              this.loadingItem = false
            })
        }
        this.loadingItem = false;
      },
        (err) => {
          console.warn(err)
          this.loadingItem = false;
        })
  }

  ngOnInit(): void {
    console.log("Usr", this.global.user)
  }

}
