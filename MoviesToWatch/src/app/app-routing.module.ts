import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard} from './guards/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'splashscreen',
    loadChildren: () => import('./pages/splashscreen/splashscreen.module').then( m => m.SplashscreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrazione',
    loadChildren: () => import('./pages/registrazione/registrazione.module').then( m => m.RegistrazionePageModule)
  },
  {
    path: 'questionario',
    loadChildren: () => import('./pages/questionario/questionario.module').then( m => m.QuestionarioPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'toprated',
    loadChildren: () => import('./pages/toprated/toprated.module').then( m => m.TopratedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'davedere',
    loadChildren: () => import('./pages/davedere/davedere.module').then( m => m.DavederePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'giavisti',
    loadChildren: () => import('./pages/giavisti/giavisti.module').then( m => m.GiavistiPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'areautente',
    loadChildren: () => import('./pages/areautente/areautente.module').then( m => m.AreautentePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ricerca',
    loadChildren: () => import('./pages/ricerca/ricerca.module').then( m => m.RicercaPageModule),
    //canActivate: [AuthGuard]
  },
  {
    path: 'schedainformativa',
    loadChildren: () => import('./pages/schedainformativa/schedainformativa.module').then( m => m.SchedainformativaPageModule),
    //canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
