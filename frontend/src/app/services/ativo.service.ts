import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AtivoModel } from '../models/ativo-model';
import { ParametroAtivo01 } from '../parametros/parametro-ativo01';

@Injectable({
providedIn: 'root',
})
export class AtivoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getAtivos(): Observable<AtivoModel[]> {
		return this.http.get<AtivoModel[]>(`${this.apiURL}Ativos`);
	}
	getAtivosParametro_01(params: ParametroAtivo01): Observable<AtivoModel[]> {
		return this.http.post<AtivoModel[]>(`${this.apiURL}ativos`,params);
	}
	getAtivo(id_ativo:number,id_empresa:number,etiqueta:number): Observable<AtivoModel> { 
 		return this.http.get<AtivoModel >(`${ this.apiURL}ativo/${id_ativo}/${id_empresa}/${etiqueta}`);
	}
	ativoInsert(ativo:AtivoModel):Observable<AtivoModel> { 
		return this.http.post<AtivoModel>(`${this.apiURL}ativo`, ativo);
	}
	ativoUpdate(ativo:AtivoModel):Observable<AtivoModel> { 
		return this.http.put<AtivoModel>(`${this.apiURL}ativo`,ativo);
	}
	ativoDelete(id_ativo:number,id_empresa:number,etiqueta:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}ativo/${id_ativo}/${id_empresa}/${etiqueta}`);
	}
}