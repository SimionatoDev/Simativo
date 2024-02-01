import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TipoModel } from "../models/tipo-model";
import { ParametroTipo01 } from "../parametros/parametro-tipo01";

@Injectable({
  providedIn: "root",
})
export class TipoService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getTipos(): Observable<TipoModel[]> {
    return this.http.get<TipoModel[]>(`${this.apiURL}Tipos`);
  }
  getTiposParametro_01(params: ParametroTipo01): Observable<TipoModel[]> {
    return this.http.post<TipoModel[]>(`${this.apiURL}tipos`, params);
  }
  getTipo(id_empresa: number, id_tipo: number): Observable<TipoModel> {
    return this.http.get<TipoModel>(
      `${this.apiURL}tipo/${id_empresa}/${id_tipo}`
    );
  }
  tipoInsert(tipo: TipoModel): Observable<TipoModel> {
    return this.http.post<TipoModel>(`${this.apiURL}tipo`, tipo);
  }
  tipoUpdate(tipo: TipoModel): Observable<TipoModel> {
    return this.http.put<TipoModel>(`${this.apiURL}tipo`, tipo);
  }
  tipoDelete(id_empresa: number, id_tipo: number): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}tipo/${id_empresa}/${id_tipo}`);
  }
}
