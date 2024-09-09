import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductItem } from 'src/app/interface/product';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  productDetail: ProductItem = {
    id: 0,
    title: '',
    price: '',
    category: '',
    description: '',
    image: ''
  }

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,) {

    this.route.params.subscribe(res => {
      if (res.id) {
        this.api.getProduct(res.id).subscribe((res) => {
          if (res != null) {
            this.productDetail = res;
          } else {
            this.router.navigate(['/home'])
          }
        },
          (err) => {
            console.warn(err);
            this.router.navigate(['/home'])
          }
        )
      } else {
        this.router.navigate(['/home'])
      }
    })
  }

  ngOnInit(): void {
  }

}
