import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ApiService } from 'src/app/service/api.service';
import { ProductItem } from 'src/app/interface/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './home.component.scss']
})
export class HomeComponent implements OnInit {

  categoryType = ''

  productList: ProductItem[] = []



  customOptions: OwlOptions = {
    loop: true,
    // margin: 10,
    nav: true,
    dots: false,  // Show dots (pagination)
    // center: true,
    navText: [
      ' <img src="../../../assets/home-image/prev.png" alt="Previous">', // Custom left arrow
      '<img src="../../../assets/home-image/next.png" alt="Next">'   // Custom right arrow
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

  constructor(private api: ApiService) {
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
      this.productList = res;
    }, (err) => {
      console.warn(err)
    })

  }



}
