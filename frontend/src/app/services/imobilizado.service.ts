import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ImobilizadoModel } from "../models/imobilizado-model";
import { ParametroImobilizado01 } from "../parametros/parametro-imobilizado01";

@Injectable({
  providedIn: "root",
})
export class ImobilizadoService {
  apiURL: string = environment.apiURL;
  constructor(private http: HttpClient) {}
  getImobilizados(): Observable<ImobilizadoModel[]> {
    return this.http.get<ImobilizadoModel[]>(`${this.apiURL}Imobilizados`);
  }
  getImobilizadosParametro_01(
    params: ParametroImobilizado01
  ): Observable<ImobilizadoModel[]> {
    return this.http.post<ImobilizadoModel[]>(
      `${this.apiURL}imobilizados`,
      params
    );
  }
  getImobilizado(
    id_imobilizado: number,
    id_empresa: number
  ): Observable<ImobilizadoModel> {
    return this.http.get<ImobilizadoModel>(
      `${this.apiURL}imobilizado/${id_imobilizado}/${id_empresa}`
    );
  }
  imobilizadoInsert(
    imobilizado: ImobilizadoModel
  ): Observable<ImobilizadoModel> {
    return this.http.post<ImobilizadoModel>(
      `${this.apiURL}imobilizado`,
      imobilizado
    );
  }
  imobilizadoUpdate(
    imobilizado: ImobilizadoModel
  ): Observable<ImobilizadoModel> {
    return this.http.put<ImobilizadoModel>(
      `${this.apiURL}imobilizado`,
      imobilizado
    );
  }
  imobilizadoDelete(
    id_imobilizado: number,
    id_empresa: number
  ): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURL}imobilizado/${id_imobilizado}/${id_empresa}`
    );
  }
}
