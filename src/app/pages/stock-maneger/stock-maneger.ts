import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrendingUp, TrendingDown, Package } from 'lucide-angular/src/icons';
import { Movimentation, MovimentationService, movimentacao } from '../../services/movimentation.service';
import { ProdutoService, Produto } from '../../services/product.service';
import { LucideAngularModule } from "lucide-angular";

@Component({
  selector: 'app-stock-maneger',
  standalone: true,
  imports: [FormsModule, CommonModule, LucideAngularModule],
  templateUrl: './stock-maneger.html',
  styleUrl: './stock-maneger.sass',
})
export class StockManeger {

  readonly TrendingUp = TrendingUp;
  readonly TrendingDown = TrendingDown;
  readonly Package = Package;

  movimentation: Movimentation[] = [];
  produto: Produto[] = [];
  
  typeMovimentations = [
    { type: 'input', label: 'Entrada' },
    { type: 'output', label: 'Saída' }
  ];

  formData: Movimentation = {
    type: 'input',
    quantity: 0,
    date: this.getDataAtual(), 
    product: ""
  };

  constructor(
    private movimentationService: MovimentationService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.carregarMovimentacoes();
    this.carregarProdutos();
  }

  getDataAtual(): string {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  }

  carregarMovimentacoes() {
    this.movimentationService.getMovimentations().subscribe({
      next: (data) => {
        console.log('Movimentações carregadas:', data);
        this.movimentation = data;
      },
      error: (err) => {
        console.error('Erro ao carregar movimentações:', err);
        alert('Erro ao carregar movimentações. Tente novamente.');
      }
    });
  }

  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        console.log('Produtos carregados:', data);
        this.produto = data.sort((a, b) => 
          a.name.localeCompare(b.name)
        );
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        alert('Erro ao carregar produtos. Tente novamente.');
      }
    });
  }

  criarMovimentacao() {
    if (!this.validarFormulario()) {
      return;
    }

    if (this.formData.type === 'output') {
      this.verificarEstoqueMinimo();
    }

    
    this.movimentationService.criarMovimentation(this.formData).subscribe({
      next: (data) => {
        console.log('Movimentação criada com sucesso:', data);
        alert('Movimentação registrada com sucesso!');
        this.limparFormulario();
        this.carregarMovimentacoes(); 
        this.carregarProdutos(); 
      },
      error: (err) => {
        console.error('Erro ao criar movimentação:', err);
        alert('Erro ao registrar movimentação. Tente novamente.');
      }
    });
  }

  validarFormulario(): boolean {
    if (!this.formData.product || this.formData.product.trim() === "") {
      alert('Por favor, selecione um produto.');
      return false;
    }

    if (!this.formData.type) {
      alert('Por favor, selecione o tipo de movimentação.');
      return false;
    }

    if (!this.formData.quantity || this.formData.quantity <= 0) {
      alert('Por favor, insira uma quantidade válida.');
      return false;
    }

    if (!this.formData.date) {
      alert('Por favor, selecione uma data.');
      return false;
    }

    return true;
  }

verificarEstoqueMinimo() {
  const produto = this.produto.find(p => p.uuid === this.formData.product);
  
  if (!produto) return;

  const estoqueAposMovimentacao = produto.stock - this.formData.quantity;

  if (estoqueAposMovimentacao < 0) {
    alert(
      `ERRO: Estoque insuficiente!\n\n` +
      `Produto: ${produto.name}\n` +
      `Estoque atual: ${produto.stock}\n` +
      `Quantidade solicitada: ${this.formData.quantity}`
    );
    return;
  }

  if (estoqueAposMovimentacao < produto.min_stock) {
    const confirmar = confirm(
      `⚠️ ALERTA DE ESTOQUE MÍNIMO!\n\n` +
      `Produto: ${produto.name}\n` +
      `Estoque atual: ${produto.stock}\n` +
      `Estoque após saída: ${estoqueAposMovimentacao}\n` +
      `Estoque mínimo: ${produto.min_stock}\n\n` +
      `Deseja continuar mesmo assim?`
    );

    if (!confirmar) {
      throw new Error('Operação cancelada pelo usuário');
    }
  }
}


  limparFormulario() {
    this.formData = {
      type: 'input',
      quantity: 0,
      date: this.getDataAtual(),
      product: ""
    };
  }

  cancelar() {
    this.limparFormulario();
  }

  getProdutoNome(produtoId: string): string {
    const produto = this.produto.find(p => p.uuid === produtoId);
    return produto ? produto.name : 'Produto não encontrado';
  }

  getProdutoEstoque(produtoId: string): number {
    const produto = this.produto.find(p => p.uuid === produtoId);
    return produto ? produto.stock : 0;
  }

  isEstoqueBaixo(produtoId: string): boolean {
    const produto = this.produto.find(p => p.uuid === produtoId);
    return produto ? produto.stock < produto.min_stock : false;
  }
}