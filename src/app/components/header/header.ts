import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { OnInit } from '@angular/core';
import { User } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.sass',
})

export class Header implements OnInit {
  username: string | null = null;
  readonly User = User
  
  constructor(private authService: AuthService,private router: Router) {}
  
  ngOnInit() {
    this.loadUsername();
  }
  
  loadUsername() {
    this.username = this.authService.getUsername();
    console.log('Username carregado:', this.username);
  }
  
  pegarNomeDoUsuario(): string {
    return this.username || 'Usuário';
  }
  
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('username');
    this.router.navigate(['/login'])
  }
}