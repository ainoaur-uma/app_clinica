import { Component, OnInit } from '@angular/core';
import { AgendasService } from '../../services/agendas.service';
import { Agenda } from '../../services/agendas.service';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent implements OnInit {
  agendas: Agenda[] = []; // Aquí defines una propiedad para almacenar los datos

  constructor(private agendasService: AgendasService) { } // Inyecta el servicio AgendasService

  ngOnInit(): void {
    // Este método se ejecuta cuando el componente se inicia
    // Aquí puedes llamar a métodos del servicio para cargar datos, por ejemplo, al iniciar la página

    // Llama al método del servicio para obtener todas las agendas
    this.agendasService.getAgendas().subscribe((data: Agenda[]) => {
      this.agendas = data; // Asigna los datos obtenidos del servicio a la propiedad 'agendas'
    });
  }
}
