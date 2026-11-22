import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { X, Save } from 'lucide-angular';
import { FormsModule } from '@angular/forms';
import { Produto, tipoProduto } from '../../services/product.service';
@Component({
  selector: 'app-modal-create-edit-product',
  imports: [LucideAngularModule, CommonModule, FormsModule],
  templateUrl: './modal-create-edit-product.html',
  styleUrl: './modal-create-edit-product.sass',
})
export class ModalCreateEditProduct {
  readonly X = X;
  readonly Save = Save;

  // Parametros do componente
  @Input() produto?: Produto;
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<Produto>();

  formData: Produto = {
    product: 'smartphone',
    name: '',
    voltage: '',
    dimension: '',
    screen_resolutions: '',
    storage_capacity: '',
    connectivity: [],
    stock: 0,
    min_stock: 0
  };

  categorias: tipoProduto[] = ['notebook', 'smartTV', 'smartphone'];

  newConectivity: string = '';

  ngOnInit() {
    if (this.mode == 'edit' && this.produto) {
      this.formData = { ...this.produto }
    }
  }

  addConnectivity() {
    if (this.newConectivity.trim()) {
      this.formData.connectivity.push(this.newConectivity.trim());
      this.newConectivity = '';
    }
  }

  removeConnectivity(index: number) {
    this.formData.connectivity.splice(index, 1);
  }

  isFormValid(): boolean {
    return !!(
      this.formData.product &&
      this.formData.name?.trim() &&
      this.formData.voltage?.trim() &&
      this.formData.dimension?.trim() &&
      this.formData.screen_resolutions?.trim() &&
      this.formData.storage_capacity?.trim() &&
      this.formData.stock >= 0 &&
      this.formData.min_stock >= 0);
  }

  save() {
    if (this.isFormValid()) {
      this.onSave.emit(this.formData);
    }
  }

  close() {
    this.onClose.emit();
  }

  closeOnOverlay(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
