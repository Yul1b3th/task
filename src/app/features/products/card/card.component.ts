import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

function addDiscountProperty(product: Product): Product {
  return {
    ...product,
    discount: product.price * 0.1,
  };
}

interface Rating {
  rate: number,
  count: number
  }

export interface Product{
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: Rating,
  discount?: number
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent{
  // product = input.required({
  //   transform: addDiscountProperty,
  // });
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(product: Product): void {
    this.addToCart.emit(product);
  }

  // rating = computed(() => {
  //   const { rating } = this.product();
  //   return Object.values(rating);
  // });
}

// export class CardComponent implements OnChanges {
//   @Input({ required: true, transform: addDiscountProperty }) product!: any;
//   rating: string[] = [];

//   ngOnChanges(changes: any): void {
//     if (changes.product) {
//       const { rating } = this.product;
//       this.rating = Object.values(rating);
//     }
//   }
// }
