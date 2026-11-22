import { Injectable} from "@angular/core"; // transforma uma classe em um serviço Angular, permitindo que ela seja injetada em outros componentes ou serviços
import { HttpClient} from "@angular/common/http"; 
import { Observable } from "rxjs"; // usado pra operações assíncronas no Angular
import { tap } from "rxjs/operators";

interface LoginResponse{
    // usando porque é oque o DjangoRestFramework Retorna
    access:string, 
    refresh:string
}

//Transforma a classe em um serviço Angular
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = "http://localhost:8000/token/";

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
        localStorage.setItem('username',username);
        console.log("acess"+response.access);
        console.log("refresh"+response.refresh);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getUsername(){
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  isAuthenticated() {
    return !!this.getToken();
  }
}
