import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { Navbar } from './components/navbar/navbar';

@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    AppRoutingModule,
    Navbar
  ],
  providers: [provideBrowserGlobalErrorListeners(), provideClientHydration(withEventReplay())],
  bootstrap: [App],
})
export class AppModule { }
