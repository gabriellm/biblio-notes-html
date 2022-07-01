import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/domain/reserva';
import { ReservaModel } from '../model/reserva-model';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.scss'],
})
export class ReservaComponent implements OnInit {
  list: Reserva[] = [];

  form: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    reserv: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    this.carregarTabela();
  }

  private carregarTabela(): void {
    this.reservaService.consultar().subscribe((domains: Reserva[]) => {
      if (domains) {
        this.list = domains;
      }
    });
  }

  reservar(): void {
    const id = this.form.controls['id'].value;
    const reserva: ReservaModel = this.form.getRawValue();
    if (id) {
      this.reservaService.alterar(id, reserva).subscribe((domain: Reserva) => {
        if (domain.id) {
          this.carregarTabela();
          this.form.reset();
        }
      });
    } else {
      this.reservaService.reservar(reserva).subscribe((domain: Reserva) => {
        if (domain.id) {
          this.list.push(domain);
          this.form.reset();
        }
      });
    }
  }

  editar(reserva: Reserva): void {
    this.form.controls['id'].setValue(reserva.id);
    this.form.controls['nome'].setValue(reserva.nome);
    this.form.controls['cpf'].setValue(reserva.documento);
    this.form.controls['reserv'].setValue(reserva.reserv);
    this.form.controls['email'].setValue(reserva.email);
  }

  apagar(reserva: Reserva): void {
    this.reservaService.remover(reserva.id).subscribe((d: Reserva) => {
      if (d.id) {
        this.carregarTabela();
      }
    });
  }
}
