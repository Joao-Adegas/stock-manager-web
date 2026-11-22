import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const modalService = inject(ModalService);
  const authService = inject(AuthService);
  
  const token = localStorage.getItem('access_token');
  
  console.log('🔍 Interceptor executado!');
  console.log('🔑 Token:', token);

  // Adiciona o token se existir
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('✅ Header Authorization adicionado');
  }

  // Trata erros de resposta
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // ✅ Detecta erro 401 (Unauthorized)
      if (error.status === 401) {
        console.log('🚨 Token expirado ou inválido (401)');
        
        // Limpa dados de autenticação
        authService.logout();
        
        // Abre o modal
        modalService.openSessionExpiredModal();
        
        // Redireciona após 1 segundo (tempo para ver o modal)
        setTimeout(() => {
          modalService.closeSessionExpiredModal();
          router.navigate(['/login']);
        }, 3000);
      }
      
      return throwError(() => error);
    })
  );
};