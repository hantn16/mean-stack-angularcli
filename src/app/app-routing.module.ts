import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'main', loadChildren: './main/main.module#MainModule'/*, canActivate: [AuthGuardService]*/ },
  { path: 'page-not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: false, useHash: false })
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
