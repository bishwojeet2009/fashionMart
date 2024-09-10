import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';
import { ProductItem } from 'src/app/interface/product';
import { addProductListAction } from 'src/app/store/product/product.action';
import { GlobalService } from 'src/app/service/global.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  categoryType = ''
  productList: ProductItem[] = [];

  productSubscription: Subscription | undefined



  customOptions: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    navText: [
      ' <img src="assets/home-image/prev.png" alt="Previous">', // Custom left arrow
      '<img src="assets/home-image/next.png" alt="Next">'   // Custom right arrow
    ],
    responsive: {
      0: {
        items: 2
      },
      450: {
        items: 3
      },
      900: {
        items: 4
      }
    }
  };

  constructor(private api: ApiService, public global: GlobalService) {
    this.productSubscription = this.global.productList$.subscribe(res => {
      this.productList = res.productList
    })
    this.getProductList()
  }

  ngOnInit(): void {
  }

  changeCategory(value: string) {
    this.categoryType = value;
    this.productList = []
    this.getProductList()
  }

  getProductList() {
    this.api.getAllProduct(this.categoryType).subscribe((res) => {
      this.global.store.dispatch(addProductListAction({ productList: res }))
      this.productList = res;
    }, (err) => {
      console.warn(err)
    })

  }

  ngOnDestroy(): void {
    this.productSubscription ? this.productSubscription.unsubscribe() : ''
  }



}
