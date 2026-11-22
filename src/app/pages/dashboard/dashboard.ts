import { Component, OnInit } from '@angular/core';
import { CardDashboard } from '../../components/card-dashboard/card-dashboard';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { ProdutoService, Produto } from '../../services/product.service';
import { MovimentationService } from '../../services/movimentation.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardDashboard, CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.sass'],
})
export class Dashboard implements OnInit {
  produtos: Produto[] = [];
  totalProdutos!: number;
  produtosAbaixoDoMinimo!: number;
  movimentacoes!: number;
  username: string | null = null;

  constructor(
    private produtosService: ProdutoService,
    private movimentationService: MovimentationService,
    private authService: AuthService) { }

  ngOnInit() {
    this.produtosService.getProdutos().subscribe(data => {
      console.table(data)
      this.produtos = data; 
      this.totalProdutos = data.length;
      this.cards[0].qtd = this.totalProdutos;
    }),

      this.produtosService.getProdutosAbaixoDoMinimo().subscribe(data => {
        console.table(data)
        this.produtosAbaixoDoMinimo = data.length;
        this.cards[1].qtd = this.produtosAbaixoDoMinimo
      }),

      this.movimentationService.getMovimentations().subscribe(data => {
        console.table(data);
        this.movimentacoes = data.length;
        this.cards[2].qtd = this.movimentacoes;
      })
  }

  pegarUsername(){
    this.username = this.authService.getUsername();
  }

  cards = [
    { title: "Total de Produtos", qtd: this.totalProdutos, description: "Produtos Cadastrados" },
    { title: "Estoque Baixo", qtd: this.produtosAbaixoDoMinimo, description: "Produtos abaixo do minimo" },
    { title: "Movimentações", qtd: this.movimentacoes, description: "Total de Movimentações" },
    { title: "Ultimos 7 Dias", qtd: 1, description: "Movimentações recentes" }
  ];
}
