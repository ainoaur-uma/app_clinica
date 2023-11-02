import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//tipado de los datos que obtendremos de la API 
export interface Agenda {
  id: number;
  descripcion: string;
  horario: string;
}

@Injectable({
  providedIn: 'root',
})
export class AgendasService {
  private apiUrlAgendas = 'http://localhost:3000/agendas';//URL del servidor Node.js donde se encuentran las rutas para las agendas.

  constructor(private http: HttpClient) {}

  //Métodos para interactuar con la API de agendas: 

  getAgendas(): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(this.apiUrlAgendas);
  }

  createAgenda(agendaData: Agenda): Observable<Agenda> {
    return this.http.post<Agenda>(this.apiUrlAgendas, agendaData);
  }

  updateAgenda(agendaId: number, updatedAgendaData: Agenda): Observable<Agenda> {
    const url = `${this.apiUrlAgendas}/${agendaId}`;
    return this.http.put<Agenda>(url, updatedAgendaData);
  }

  deleteAgenda(agendaId: number): Observable<any> {
    const url = `${this.apiUrlAgendas}/${agendaId}`;
    return this.http.delete(url);
  }
}
