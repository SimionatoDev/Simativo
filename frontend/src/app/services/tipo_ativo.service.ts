import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tipo_AtivoModel } from '../models/tipo_ativo-model';
import { ParametroTipo_Ativo01 } from '../parametros/parametro-tipo_ativo01';

@Injectable({
providedIn: 'root',
})
export class Tipo_AtivoService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getTipos_Ativos(): Observable<Tipo_AtivoModel[]> {
		return this.http.get<Tipo_AtivoModel[]>(`${this.apiURL}Tipos_Ativos`);
	}
	getTipos_AtivosParametro_01(params: ParametroTipo_Ativo01): Observable<Tipo_AtivoModel[]> {
		return this.http.post<Tipo_AtivoModel[]>(`${this.apiURL}tipos_ativos`,params);
	}
	getTipo_Ativo(id_empresa:number,tipo_ativo:number): Observable<Tipo_AtivoModel> { 
 		return this.http.get<Tipo_AtivoModel >(`${ this.apiURL}tipo_ativo/${id_empresa}/${tipo_ativo}`);
	}
	tipo_ativoInsert(tipo_ativo:Tipo_AtivoModel):Observable<Tipo_AtivoModel> { 
		return this.http.post<Tipo_AtivoModel>(`${this.apiURL}tipo_ativo`, tipo_ativo);
	}
	tipo_ativoUpdate(tipo_ativo:Tipo_AtivoModel):Observable<Tipo_AtivoModel> { 
		return this.http.put<Tipo_AtivoModel>(`${this.apiURL}tipo_ativo`,tipo_ativo);
	}
	tipo_ativoDelete(id_empresa:number,tipo_ativo:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}tipo_ativo/${id_empresa}/${tipo_ativo}`);
	}
}