import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Transaction } from '../../models/transaction.model';
import { TransactionComponent } from '../transaction/transaction.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule,TransactionComponent],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  @Input() transactions!: Transaction[];
}
