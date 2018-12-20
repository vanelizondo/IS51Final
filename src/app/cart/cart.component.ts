import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.bikes = await this.loadItems();
  }

  deleteItem(index: number) {
    this.bikes.splice(index, 1);
    this.saveToLocalStorage();
  }

  async loadItems() {
    const testData = JSON.parse(localStorage.getItem('test-data'));
    if (testData && testData.length > 0) {
      this.bikes = testData;
      return testData;
    } else {
      const data = await this.loadFromFile();
      this.bikes = data;
      return data;
    }
  }

  async loadFromFile() {
    const x = await this.http.get('assets/inventory.json').toPromise();
    return x.json();
  }

  saveToLocalStorage() {
    localStorage.setItem('test-data', JSON.stringify(this.bikes));
  }

  addItem(index: number) {
    const defaultItems = [
      {
        'id': 1,
        'image': '../../assets/bike1.jpeg',
        'description': 'Bike Model 1',
        'price': 5000,
        'quantity': 1
      },
      {
        'id': 2,
        'image': '../../assets/bike2.jpeg',
        'description': 'Bike Model 2',
        'price': 4000,
        'quantity': 2
      },
      {
        'id': 3,
        'image': '../../assets/bike3.jpeg',
        'description': 'Bike Model 3',
        'price': 3000,
        'quantity': 3
      }
    ];
    this.bikes.push(defaultItems[index]);
    this.saveToLocalStorage();
  }

  compute() {
    let total: any = this.bikes.reduce((prev, item) => {
      prev += item.quantity * item.price;
      return prev;
    }, 0);
    const tax: any = (total.toFixed(2) * .15).toFixed(2);
    const subtotal = (total - tax).toFixed(2);
    total = total.toFixed(2);
    const data = {
      tax,
      total,
      subtotal,
      name: this.setName()
    };

    if (this.myName === '') {
      this.toastService.showToast('warning', 7000, 'Name must not be null');
    } else if (this.myName.indexOf(', ') === -1) {
      this.toastService.showToast('warning', 7000, 'Name must contain a comma and a space');
    } else {
      localStorage.setItem('test-data', JSON.stringify(data));
      this.router.navigate(['invoice', data]);
    }

  }

  setName() {
    const commaIndex = this.myName.indexOf(', ');
    const firstName = this.myName.slice(commaIndex + 1, this.myName.length);
    const lastName = this.myName.slice(0, commaIndex);
    return firstName + ' ' + lastName;
  }

}
