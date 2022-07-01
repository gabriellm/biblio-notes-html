import { Cliente } from './cliente';
import { Produto } from './produto';

export interface Pedido {
  id: string;
  cliente: Cliente;
  produtos: Produto[];
  valor: number;
  valorPago: number;
  troco: number;
  dataEmissao: Date;
  dataPagamento: Date;
  dataCancelamento: Date;
  status: string;
}
