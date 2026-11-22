import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export type tipoProduto = "notebook" | "smartTV" | "smartphone";

export interface Produto {
  uuid?: string;        // <- chave primária
  product: tipoProduto;
  name: string;
  voltage: string;
  dimension: string;
  screen_resolutions: string;
  storage_capacity: string;
  connectivity: string[];
  stock: number;
  min_stock: number;
}


interface CriarProduto extends Omit<Produto,'uuid'>{} // sem o id
interface AtualizarProduto extends Partial<Omit<Produto,'uuid'>>{} // tudo opcional exceto oque vai ser alterado

@Injectable({providedIn:"root"})
export class ProdutoService{

    constructor(private http:HttpClient){}

    getProdutos(): Observable<Produto[]>{
        return this.http.get<Produto[]>("http://localhost:8000/product/");
    }

    getProdutosAbaixoDoMinimo(): Observable<Produto[]>{
        return this.http.get<Produto[]>("http://localhost:8000/product/baixo-minimo/");
    }

    criarProduto(produto:Produto):Observable<Produto>{
        return this.http.post<Produto>("http://localhost:8000/product/",produto);
    }

    atualiarProduto(id:string,produto:Produto):Observable<Produto>{
        return this.http.patch<Produto>(`http://localhost:8000/product/${id}/`,produto);
    }

    deletarProduto(id:string){
        return this.http.delete(`http://localhost:8000/product/${id}/`);
    }
}