import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { LocalStorageService } from '../localStorageService';
import { IUser } from '../login/login.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  inventory: Array<Inventory> = [];
  nameParams: string;
  localStorageService: LocalStorageService<any>;
  currentUser: IUser;


  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const currentUser = this.localStorageService.getItemsFromLocalStorage('user');
    if (currentUser == null) {
      this.router.navigate(['']);
    }

  }

  async loadInventory() {
    const savedInventory = this.getItemsFromLocalStorage('invetory');
    if (savedInventory && savedInventory.length > 0) {
      this.inventory = savedInventory;
    } else {
      this.inventory = await this.loadItemsFromFile;
    }

    async loadItemsFromFile() {
      const data: any = await this.http.get('aseets/inventory.json').toPromise();

      return data;
    }

    addInventory() {
      this.loadInventory.unshift(new Inventory({
        id: null,
        image: null,
        description: null,
        price: null,
        quantity: null

      }));
    }

    deleteInventory(index: number) {
      this.inventory.splice(index, 1);
      this.saveItemsToLocalStorage(this.inventory);
    }
    saveInventory(inventory: any) {
      let hasError = false;
      Object.keys(inventory).forEach((key: any) => {
        if (inventory[key] == null) {
          hasError = true;
          this.toasteService.showToast('danger', `Save failed! Property ${key} must not be null`, 2000);
        }
      });
      if (!hasError) {
        inventory.editing = false;
        this.saveItemsToLocalStorage(this.inventory);

      }
    }

    saveItemsToLocalStorage(inventory: Array<Inventory>) {
      return this.localStorageService.saveItemsToLocalStorage(inventory);
    }
  
    getItemsFromLocalStorage(key: string) {
      // const savedContact = JSON.parse(localStorage.getItem(key));
      return this.localStorageService.getItemsFromLocalStorage();

    }
  
    searchContact(params: string) {
      this.inventory = this.inventory.filter((item: Inventory) => {
        const fullName = item.firstName + ' ' + item.lastName;
        if (params === fullName || params === item.lastName || params === item.firstName) {
          return true;
        } else {
          return false;
        }
      });

    }
 
    logout() {
      this.localStorageService.clearItemsFromLocalStorage('user');
      this.router.navigate(['']);
    }
  
  }