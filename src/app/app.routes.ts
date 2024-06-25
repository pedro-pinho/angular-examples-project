import { Routes } from '@angular/router';
import { LifecycleHooksComponent } from './lifecycle-hooks/lifecycle-hooks.component';
import { DecoratorsComponent } from './decorators/decorators.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RoutingComponent } from './routing/routing.component';
import { ServiceExampleComponent } from './service-example/service-example.component';
import { TemplateFormComponent } from './template-form/template-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './authentication/auth.guard';
import { formGuard } from './form.guard';
import { ObservablesComponent } from './observables/observables.component';
import { RxjsOperatorsComponent } from './rxjs-operators/rxjs-operators.component';
import { HttpComponent } from './http/http.component';
import { HomeComponent } from './simple-crud/products/home/home.component';
import { CreateComponent } from './simple-crud/products/create/create.component';
import { EditComponent } from './simple-crud/products/edit/edit.component';
import { ListComponent } from './todo-signal/list.component';
import { CartSignalComponent } from './cart-signal/cart-signal.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: LifecycleHooksComponent
  },
  {
    path: 'lifecycle-hooks',
    component: LifecycleHooksComponent,
    canActivate: [authGuard]
  },
  {
    path: 'decorators',
    component: DecoratorsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'pipes',
    loadComponent: () => import('./pipes/pipes.component').then(m => m.PipesComponent),
    canActivate: [authGuard],
    data: { preload: true },
  },
  {
    path: 'employee',
    component: RoutingComponent,
    canActivate: [authGuard]
  },
  {
    path: 'services',
    component: ServiceExampleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'template-form',
    component: TemplateFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'reactive-form',
    component: ReactiveFormComponent,
    canActivate: [authGuard],
    canDeactivate: [formGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'observables',
    component: ObservablesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'rxjs-operators',
    component: RxjsOperatorsComponent,
    canActivate: [authGuard]
  },
  {
    path: 'http',
    component: HttpComponent,
  },
  {
    path: 'crud',
    component: HomeComponent,
  },
  {
    path: 'crud/new',
    component: CreateComponent,
  },
  {
    path: 'crud/:id',
    component: EditComponent,
  },
  {
    path: 'todo',
    component: ListComponent,
  },
  {
    path: 'cart',
    component: CartSignalComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
