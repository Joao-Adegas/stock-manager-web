import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatProgressSpinnerModule],
  templateUrl: './login.html',
  styleUrls: ['./login.sass'],
})
export class Login {
  username: string = '';
  password: string = '';
  erros:string = '';
  isLoading = false;

  constructor(private authservice: AuthService, private router:Router){}

  onSubmit(){
    this.isLoading = true;
    this.authservice.login(this.username,this.password).subscribe({
      next: () => {
        console.table("Logado com sucesso");
        this.router.navigate(['/dashboard'])
      },
      error:(err) => {
        console.table(err)
        if(err.error.detail){
          this.erros = err.error.detail;
        }
        else if(err.error.error){
          this.erros = err.error.error;
        }
        else{
          this.erros = "Erro inesperado";
        }
        this.isLoading = false;
      }
    })
  }

}
