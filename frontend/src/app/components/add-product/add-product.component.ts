import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NewProduct } from 'src/app/Product';
import { UiService } from 'src/app/services/ui.service';
import { ProductService } from 'src/app/services/product.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
  @Output() onAddProduct: EventEmitter<void> = new EventEmitter<void>();
  productName!: string;
  productOwnerName!: string;
  developers!: string[];
  newDeveloper: string = '';
  scrumMasterName!: string;
  startDate!: Date;
  methodology!: string;
  location!: string;

  showAddProduct: boolean = true;
  subscription: Subscription;


  constructor(private uiService: UiService, private productService: ProductService) {
    this.subscription = this.uiService
    .onToggle()
    .subscribe(value => this.showAddProduct = value)
  }

  ngOnInit(): void {

  }

  onSubmit() {
    let missingAttributes = [];

    if (!this.productName) {
      missingAttributes.push("Product Name");
    }
  
    if (!this.productOwnerName) {
      missingAttributes.push("Product Owner Name");
    }
  
    if (!this.developers || this.developers.length === 0) {
      missingAttributes.push("Developers");
    }
  
    if (!this.scrumMasterName) {
      missingAttributes.push("Scrum Master Name");
    }
  
    if (!this.startDate) {
      missingAttributes.push("Start Date");
    }
  
    if (!this.methodology) {
      missingAttributes.push("Methodology");
    }
  
    if (!this.location) {
      missingAttributes.push("Location");
    }
  
    if (missingAttributes.length > 0) {
      const missingAttributesMessage = "Please fill in the following missing attributes:\n" + missingAttributes.join(", ");
      alert(missingAttributesMessage);
      return;
    }

    const newProduct: NewProduct = {
      productName: this.productName,
      productOwnerName: this.productOwnerName,
      developers: this.developers,
      scrumMasterName: this.scrumMasterName,
      startDate: this.startDate,
      methodology: this.methodology,
      location: this.location
    }
    this.productService.addProduct(newProduct).subscribe(() => {
    });
    this.onAddProduct.emit();
  }

}
