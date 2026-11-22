import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, AlertCircle, X } from 'lucide-angular';

@Component({
  selector: 'app-modal-aviso',
  imports: [LucideAngularModule],
  templateUrl: './modal-aviso.html',
  styleUrl: './modal-aviso.sass',
})
export class ModalAviso {
  readonly AlertCircle = AlertCircle;
  readonly X = X;
  
  @Output() onClose = new EventEmitter<void>();
  
  closeModal() {
    this.onClose.emit();
  }
}
