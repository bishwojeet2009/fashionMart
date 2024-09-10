import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interface/user';
import { ApiService } from 'src/app/service/api.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  loadingItem: Boolean = false;
  cartItems: any[] = [];

  user: User | null = null;
  userSubscription: Subscription | null;


  constructor(private api: ApiService, public global: GlobalService) {
    this.userSubscription = this.global.user$.subscribe(res => {
      this.user = res.user
    },
      (err) => {
        console.log(err)
      })
  }

  ngOnInit(): void {
    this.loadingItem = true
    this.api.getCartItem(this.user != null ? this.user.sub : 0)
      .pipe(map(res => {
        let product: any[] = []
        res.map(item => product.push(...item.products))
        return product
      }),
        map(res => {
          let product: any = {};
          res.forEach(item => {
            product[item.productId] = (product[item.productId] || 0) + item.quantity
          })
          return product
        }))
      .subscribe(res => {
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

  ngOnDestroy(): void {
    this.userSubscription ? this.userSubscription.unsubscribe() : ''
  }

}
