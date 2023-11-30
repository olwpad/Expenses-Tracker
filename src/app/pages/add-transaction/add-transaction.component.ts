import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';

// Formularios
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.scss',
})
export class AddTransactionComponent implements OnInit {
  // Objeto que administra la información del formulario
  addTransactionForm!: FormGroup;
   constructor(private transactionsService:TransactionsService,private router:Router){}

  // Se ejecuta en el montaje del componente en el DOM Tree
  ngOnInit(): void {
    // Inicialización del formulario
    this.addTransactionForm = new FormGroup({
      amount: new FormControl(0, [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      type: new FormControl('expense', Validators.required),
      category: new FormControl('food', Validators.required),
      date: new FormControl('2023-11-28', Validators.required),
    });
  }

  onSubmit() {
    // Verifica si el formulario es válido
    if (this.addTransactionForm.valid) {
      console.log('Formulario válido');
   const transaction=this.addTransactionForm.value
    this.transactionsService.create(transaction)
    .subscribe((response: Transaction) => {
    this.router.navigate(["/"])
    }); }

    console.log(this.addTransactionForm);
    console.log(this.addTransactionForm.value);
    //console.log(data);
  }
}
