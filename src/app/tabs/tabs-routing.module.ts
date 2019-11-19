import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/tab1/tab1.module').then(m => m.Tab1PageModule)
          },
          {
            path:'agregar/:listaId',
            loadChildren: () =>
              import('../pages/agregar/agregar.module').then(m => m.AgregarPageModule)
            //loadChildren:'../pages/agregar/agregar.module#agregar.module'
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
          },
          {
            path:'agregar/:listaId',
            loadChildren: () =>
              import('../pages/agregar/agregar.module').then(m => m.AgregarPageModule)
            //loadChildren:'../pages/agregar/agregar.module#agregar.module'
          }
        ]
      },
      
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
