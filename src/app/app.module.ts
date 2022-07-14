import { ReservaModule } from './reserva/reserva.module';
import { HomeModule } from './home/home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SobreModule } from './sobre/sobre/sobre.module';
import { MenuModule } from './menu/menu.module';
import { ClienteModule } from './cliente/cliente.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SobreModule,
    MenuModule,
    ClienteModule,
    ReservaModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
