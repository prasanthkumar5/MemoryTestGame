import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Homepage } from './components/homepage/homepage'
import { Howtoplay } from './components/howtoplay/howtoplay'
import { Cardsgame } from './components/cardsgame/cardsgame'

const routes: Routes = [
  { path: '', component: Homepage },
  { path: 'homepage', component: Homepage },
  { path: 'how-to-play', component: Howtoplay },
  { path: 'game/:type/:density', component: Cardsgame },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
