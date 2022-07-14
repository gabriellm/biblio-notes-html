import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Cliente } from '../domain/cliente';
import { ClienteModel } from '../model/cliente-model';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {
  list: Cliente[] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    aniver: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.carregarTabela();
  }

  private carregarTabela(): void {
    this.clienteService.consultar().subscribe((domains: Cliente[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  cadastrar(): void {
    const id = this.form.controls['id'].value;
    const cliente: ClienteModel = this.form.getRawValue();
    if (id) {
      this.clienteService.alterar(id, cliente).subscribe((domain: Cliente) => {
        if (domain.id) {
          this.carregarTabela();
          this.form.reset();
        }
      });
    } else {
      this.clienteService.cadastrar(cliente).subscribe((domain: Cliente) => {
        if (domain.id) {
          this.list.push(domain);
          this.form.reset();
        }
      });
    }
  }

  editar(cliente: Cliente): void {
    this.form.controls['id'].setValue(cliente.id);
    this.form.controls['nome'].setValue(cliente.nome);
    this.form.controls['cpf'].setValue(cliente.documento);
    this.form.controls['aniver'].setValue(cliente.aniver);
    this.form.controls['email'].setValue(cliente.email);
  }

  ordenarNome(): void {
    this.clienteService.ordenarPorNome().subscribe((domains: Cliente[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  ordenarAniver(): void {
    this.clienteService.ordenarPorAniver().subscribe((domains: Cliente[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  apagar(cliente: Cliente): void {
    this.clienteService.remover(cliente.id).subscribe((d: Cliente) => {
      if (d.id) {
        this.carregarTabela();
      }
    });
  }
}
