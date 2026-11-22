import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showSessionExpiredModal$ = new BehaviorSubject<boolean>(false);
  
  // Observable para componentes se inscreverem
  showSessionExpiredModal = this.showSessionExpiredModal$.asObservable();
  
  openSessionExpiredModal() {
    this.showSessionExpiredModal$.next(true);
  }
  
  closeSessionExpiredModal() {
    this.showSessionExpiredModal$.next(false);
  }
}