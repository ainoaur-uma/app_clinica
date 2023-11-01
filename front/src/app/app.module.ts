import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { EpisodiosComponent } from './components/episodios/episodios.component';
import { HceComponent } from './components/hce/hce.component';
import { MedicamentosComponent } from './components/medicamentos/medicamentos.component';
import { InventarioMedicamentosComponent } from './components/inventario-medicamentos/inventario-medicamentos.component';
import { CitasComponent } from './components/citas/citas.component';
import { AgendasComponent } from './components/agendas/agendas.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    EpisodiosComponent,
    HceComponent,
    MedicamentosComponent,
    InventarioMedicamentosComponent,
    CitasComponent,
    AgendasComponent,
    PacientesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
