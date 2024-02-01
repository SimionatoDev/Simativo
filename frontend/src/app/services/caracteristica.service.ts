import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CaracteristicaModel } from '../models/caracteristica-model';
import { ParametroCaracteristica01 } from '../parametros/parametro-caracteristica01';

@Injectable({
providedIn: 'root',
})
export class CaracteristicaService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getCaracteristicas(): Observable<CaracteristicaModel[]> {
		return this.http.get<CaracteristicaModel[]>(`${this.apiURL}Caracteristicas`);
	}
	getCaracteristicasParametro_01(params: ParametroCaracteristica01): Observable<CaracteristicaModel[]> {
		return this.http.post<CaracteristicaModel[]>(`${this.apiURL}caracteristicas`,params);
	}
	getCaracteristica(id_empresa:number,id_caracteristica:number): Observable<CaracteristicaModel> { 
 		return this.http.get<CaracteristicaModel >(`${ this.apiURL}caracteristica/${id_empresa}/${id_caracteristica}`);
	}
	caracteristicaInsert(caracteristica:CaracteristicaModel):Observable<CaracteristicaModel> { 
		return this.http.post<CaracteristicaModel>(`${this.apiURL}caracteristica`, caracteristica);
	}
	caracteristicaUpdate(caracteristica:CaracteristicaModel):Observable<CaracteristicaModel> { 
		return this.http.put<CaracteristicaModel>(`${this.apiURL}caracteristica`,caracteristica);
	}
	caracteristicaDelete(id_empresa:number,id_caracteristica:number):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}caracteristica/${id_empresa}/${id_caracteristica}`);
	}
}