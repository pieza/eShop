import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { Cart } from "../../models/cart";
import { OrderProvider } from "../../providers/order/order";

/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
  cart: Cart;
  isEditing = false;
  address: any;

  constructor(public nav: NavController, public alertController: AlertController, public navParasm: NavParams,
              public orderProvider: OrderProvider) {
    this.cart = navParasm.get('cart');
  }

  // edit address
  editAddress() {
    let prompt = this.alertController.create({
      title: 'Dirección',
      message: "",
      inputs: [
        {
          name: 'address',
          value: ''
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Guardar',
          handler: data => {
            console.log('Saved clicked');
          }
        }
      ]
    });

    prompt.present();
  }

  // place order button click
  buy() {
    // need to validate the address
    if (!this.address || (this.address.length < 10)) {
      // show alert
      let alert = this.alertController.create({
        title: 'Alerta',
        subTitle: 'Por favor ingrese una dirección válida',
        buttons: ['OK']
      });
      alert.present();
      return false;
    }

    this.orderProvider.add(this.cart.stores, this.address);

    // show alert
    let alert = this.alertController.create({
      title: 'Información',
      subTitle: 'Su orden ha sido enviada.',
      buttons: [
        {
          text: 'OK',
          handler: data => {
            // clear cart
            // this.cartService.clearCart();
            // back to home page
            this.nav.setRoot(HomePage);
          }
        }
      ]
    });

    alert.present();
  }

  // enable editing info
  enableEditing() {
    this.isEditing = true;
  }
}
