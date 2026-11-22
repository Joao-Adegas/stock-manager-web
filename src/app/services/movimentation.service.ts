import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export type movimentacao = "input" | "output";

export interface Movimentation{
    id?:number,
    type:movimentacao,
    quantity:number,
    date:string,
    product:string  // ja que retorna foreikey
    // se retornasse o objeto completo seria product:Produto 
}

@Injectable({providedIn:"root"})
export class MovimentationService{

    movimentation: Movimentation[] = [];

    constructor(private http:HttpClient){}

    getMovimentations():Observable<Movimentation[]>{
        return this.http.get<Movimentation[]>("http://localhost:8000/movimentation/");
    }

    criarMovimentation(m:Movimentation):Observable<Movimentation[]>{
        return this.http.post<Movimentation[]>(`http://localhost:8000/movimentation/`,m);
    }

    
}