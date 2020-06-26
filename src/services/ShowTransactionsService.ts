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

interface Transactions {
  transaction: Request[];
  totals: Totals;
}

class ShowTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): Transactions {
    const transactions = this.transactionsRepository.all();
    return transactions;
  }
}

export default ShowTransactionService;
