import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage {
  selectedContent: string = 'icons';
  selectedDensity: string = 'intermediate';

  grid3x3 = Array.from({ length: 9 }, (_, i) => i + 1);
  grid4x4 = Array.from({ length: 16 }, (_, i) => i + 1);
  grid5x5 = Array.from({ length: 25 }, (_, i) => i + 1);

  constructor(private router: Router) {}

  selectContent(type: string) {
    this.selectedContent = type;
  }

  selectDensity(level: string) {
    this.selectedDensity = level;
  }

  startGame() {
    this.router.navigate(['/game', this.selectedContent, this.selectedDensity]);
  }
}
