import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Products } from './pages/products/products';
import { StockManeger } from './pages/stock-maneger/stock-maneger';
import { Layout } from './components/layout/layout';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path:'login',component:Login},
    {path:'',redirectTo:'login',pathMatch:'full'},
    
    {path:'',component:Layout, children:[
        {path: 'dashboard',component:Dashboard,canActivate:[authGuard]},
        {path:'products',component:Products,canActivate:[authGuard]},
        {path:'stockmaneger',component:StockManeger,canActivate:[authGuard]},
    ]},
    
];

