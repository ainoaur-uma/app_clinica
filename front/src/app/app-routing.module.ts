import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendasComponent } from './components/agendas/agendas.component';

const routes: Routes = [
  { path: 'agendas', component: AgendasComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
