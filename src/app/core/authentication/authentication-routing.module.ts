
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SceibaUiAuthenticationComponent } from './authentication.component';

const routes: Routes = [
    {
        path: 'login',
        component: SceibaUiAuthenticationComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],

    exports: [RouterModule],
})
export class AuthenticateRoutingModule
{ }
