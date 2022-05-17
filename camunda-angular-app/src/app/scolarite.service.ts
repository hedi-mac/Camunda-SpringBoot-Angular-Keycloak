import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProcessDefinition } from './schemas/ProcessDefinition';
import { Task } from './schemas/Task';
import { environment } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { Etudiant } from './schemas/Etudiant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ScolariteService {
  private engineRestUrl = environment.apiUrl;

  constructor(private http: HttpClient) {

  }

  getEtudiantIngenieur(): Observable<Etudiant> {
    const endpoint = `${this.engineRestUrl}/etudiant-ing`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => console.log('erreur etudiant ingenieur . . .')),
    );
  }

  getEtudiantLicence(): Observable<Etudiant> {
    const endpoint = `${this.engineRestUrl}/etudiant-lsc`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => console.log('erreur etudiant licence . . .')),
    );
  }

}
