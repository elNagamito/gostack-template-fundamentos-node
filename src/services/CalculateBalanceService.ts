/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Totals {
  income: number;
  outcome: number;
  total: number;
}

class ListTransactionsService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactions: Request[]): Totals {
    // Soma todos os registros de entrada (income)
    const totalIncome = transactions.reduce((total, income) => {
      if (income.type === 'income') total += Number(income.value);
      return total;
    }, 0);

    // Soma todos os registros de saída (outcome)
    const totalOutcome = transactions.reduce((total, income) => {
      if (income.type === 'outcome') total += Number(income.value);
      return total;
    }, 0);

    const totals: Totals = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };

    this.transactionsRepository.getBalance(totals);
    return totals;
  }
}
export default ListTransactionsService;
