import Transaction from '../models/Transaction';
import CalculateBalanceService from '../services/CalculateBalanceService';

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
  transactions: Request[];
  balance: Totals;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private totals: Totals[];

  constructor() {
    this.transactions = [];
    this.totals = [];
  }

  public all(): Transactions {
    const transaction = this.transactions;

    const calculateBalance = new CalculateBalanceService(this);
    const totals = calculateBalance.execute(this.transactions);

    const transactions: Transactions = {
      transactions: transaction,
      balance: totals,
    };

    return transactions;
  }

  public getBalance(balance: Totals): Totals {
    this.totals.push(balance);
    return balance;
  }

  public create({ title, value, type }: Request): Transaction {
    // Cria um objeto com os dados vindos do HTTP
    const transaction = new Transaction({ title, value, type });

    // Calcula balanço atual
    const calculateBalance = new CalculateBalanceService(this);
    const balance = calculateBalance.execute(this.transactions);

    // Verifica se o valor de saída é maior do que o saldo atual
    if (transaction.type === 'outcome' && transaction.value > balance.total) {
      throw Error('Outcome should not be higher than income!');
    }

    // Insere o objeto no array principal
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
