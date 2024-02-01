import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NfeModel } from '../models/nfe-model';
import { ParametroNfe01 } from '../parametros/parametro-nfe01';

@Injectable({
providedIn: 'root',
})
export class NfeService 
{
apiURL: string = environment.apiURL;
constructor(private http: HttpClient) {}
	getNfes(): Observable<NfeModel[]> {
		return this.http.get<NfeModel[]>(`${this.apiURL}Nfes`);
	}
	getNfesParametro_01(params: ParametroNfe01): Observable<NfeModel[]> {
		return this.http.post<NfeModel[]>(`${this.apiURL}nfes`,params);
	}
	getNfe(id_empresa:number,id_nfe:number,id_fornecedor:number,numero_nfe:number,serie:string,emissao:string): Observable<NfeModel> { 
 		return this.http.get<NfeModel >(`${ this.apiURL}nfe/${id_empresa}/${id_nfe}/${id_fornecedor}/${numero_nfe}/${serie}/${emissao}`);
	}
	nfeInsert(nfe:NfeModel):Observable<NfeModel> { 
		return this.http.post<NfeModel>(`${this.apiURL}nfe`, nfe);
	}
	nfeUpdate(nfe:NfeModel):Observable<NfeModel> { 
		return this.http.put<NfeModel>(`${this.apiURL}nfe`,nfe);
	}
	nfeDelete(id_empresa:number,id_nfe:number,id_fornecedor:number,numero_nfe:number,serie:string,emissao:string):Observable<any>  { 
 		return this.http.delete<any>(`${this.apiURL}nfe/${id_empresa}/${id_nfe}/${id_fornecedor}/${numero_nfe}/${serie}/${emissao}`);
	}
}