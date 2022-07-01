import { PessoaFisica } from './pessoa-fisica';

export interface Reserva extends PessoaFisica {
  email: string;
}
