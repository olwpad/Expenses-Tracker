import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BalanceComponent } from '../../components/balance/balance.component';
import { TransactionsComponent } from '../../components/transactions/transactions.component';

// Models
import { Balance } from '../../models/balance.model';
import { Transaction } from '../../models/transaction.model';
import { TransactionsService } from '../../services/transactions.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BalanceComponent, TransactionsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  transactions: Transaction[] = [
   
  ];
  constructor(private transactionService: TransactionsService){}
  ngOnInit(): void {
    this.transactionService.get().subscribe((response: Transaction[]) => {
      this.transactions = response;
      this.calculateBalance()
    });
  }


  balance: Balance = {
    amount: 55_000,
    income: 100_000,
    expenses: 45_000,
  };
  removeTransaction(id: string) {
    this.transactionService.remove(id).subscribe((response: Transaction) => {
      console.log(response);
      this.transactions = this.transactions.filter(
        (transaction) => transaction.id !== id
      );
      this.calculateBalance()
    });
  }

  calculateBalance(): void {
    let expenses = 0;
    let income = 0;
    let amount = 0;

    this.transactions.forEach((trabajo: Transaction) => {
      if (trabajo.type === "expense") expenses += trabajo.amount;
      if (trabajo.type === "income") income += trabajo.amount;
      amount += trabajo.amount;
    });
    this.balance={expenses,income,amount}
  }
}
