import { Component } from '@angular/core';
import { Produto } from '../../services/product.service';
import { ProdutoService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { Trash2, SquarePen, Plus, CornerDownLeft } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { ModalCreateEditProduct } from '../../components/modal-create-edit-product/modal-create-edit-product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ModalCreateEditProduct, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.sass',
})

export class Products {
  readonly CornerDownLeft = CornerDownLeft
  readonly Trash2 = Trash2;
  readonly SquarePen = SquarePen;
  readonly Plus = Plus;

  produto: Produto[] = [];

  abrirModal = false;
  tipoModal: 'create' | 'edit' = 'create';
  editarProduto?: Produto;

  produtosFiltrados: Produto[] = [];
  termoPesquisa: string = '';

  constructor(private produtoService: ProdutoService) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  //fitrarProdutos
  filtrarProdutos() {
    const termo = this.termoPesquisa.toLocaleLowerCase().trim();

    if (!termo) {
      this.produtosFiltrados = this.produto;
      return;
    }
    this.produtosFiltrados = this.produto.filter(p =>
      p.name.toLocaleLowerCase().includes(termo) ||
      p.product.toLocaleLowerCase().includes(termo)
    );
  }

  // product.service functions
  carregarProdutos() {
    this.produtoService.getProdutos().subscribe({
      next: (data) => {
        console.table(data);
        this.produto = data;
        this.produtosFiltrados = data;
      }, error: (err) => {
        console.error("Erro ao ver produtos", err);
      }
    });
  }

  criarProduto(produto: Produto) {
    this.produtoService.criarProduto(produto).subscribe({
      next: () => {
        this.carregarProdutos();
        this.fecharModal();
      },
      error: (err) => {
        console.table(`Erro ao criar um produto: ${err}`);
        alert("Erro ao criar Produto. Tente novamente ou mais tarde");
      }
    })
  }


  editProduto(uuid: string, p: Produto) {
    this.produtoService.atualiarProduto(uuid, p).subscribe({
      next: () => {
        this.carregarProdutos();
        this.fecharModal();
      },
      error: (err) => {
        console.table(`Erro ao editar Produto ${err}`);
        alert("Erro ao editar produto. Tente novamente mais tarde!");
      }
    });
  }


  deletarProduto(uuid: string) {
    this.produtoService.deletarProduto(uuid).subscribe({
      next: () => {
        this.carregarProdutos();
      },
      error: (err) => {
        console.error(`Erro ao deletar produto ${uuid}: ${err}`);
      }
    });
  }


  // Tentar fazer essas duas funções ser uma só
  abrirModalCriacao() {
    this.tipoModal = 'create'
    this.editarProduto = undefined;
    this.abrirModal = true;
    console.log("MODAL DE CRIAÇÃO ABERTO");
  }

  abrirModalEdicao(p: Produto) {
    this.tipoModal = 'edit';
    this.editarProduto = p;
    this.abrirModal = true;
    console.log("MODAL DE EDIÇÃO ABERTO");
  }


  fecharModal() {
    this.abrirModal = false;
    this.editarProduto = undefined;
  }

  salvarProduto(p: Produto) {
    if (this.tipoModal == 'create') {
      this.criarProduto(p);
    }
    else {
      if (p.uuid) {
        this.editProduto(p.uuid, p);
      }
    }
  }

}
