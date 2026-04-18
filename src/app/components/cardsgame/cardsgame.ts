import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Card {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

@Component({
  selector: 'app-cardsgame',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardsgame.html',
  styleUrl: './cardsgame.scss',
})
export class Cardsgame implements OnInit, OnDestroy {
  type: string = 'icons';
  density: string = 'intermediate';
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves: number = 0;
  matches: number = 0;
  totalPairs: number = 0;
  
  timer: number = 0;
  timerInterval: any;
  gameStarted: boolean = false;
  gameWon: boolean = false;

  gridClass: string = 'grid-4x4';

  icons = ['⚡', '🔥', '💎', '🌈', '🌟', '🍀', '🍎', '🚀', '🎸', '🎮', '🛸', '🛰️', '🪐', '🌋', '🌊'];
  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
  emojis = ['😎', '👽', '🤖', '👻', '🤡', '🎃', '🦖', '🦄', '🍕', '🍩', '🍦', '🌍', '🧨', '🧿', '🧬'];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.type = (params['type'] || 'icons').toLowerCase();
      this.density = (params['density'] || 'intermediate').toLowerCase();
      this.setupGame();
    });
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  setupGame() {
    console.log(`Setting up game: ${this.type} / ${this.density}`);
    let count = 0;
    if (this.density === 'beginner') {
      count = 6;
      this.gridClass = 'grid-3x4';
    } else if (this.density === 'intermediate') {
      count = 8;
      this.gridClass = 'grid-4x4';
    } else {
      count = 12;
      this.gridClass = 'grid-4x6';
    }

    this.totalPairs = count;
    const values = this.getValues(count);
    const pairValues = [...values, ...values];
    
    // Fisher-Yates Shuffle
    for (let i = pairValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairValues[i], pairValues[j]] = [pairValues[j], pairValues[i]];
    }

    this.cards = pairValues.map((val, index) => ({
      id: index,
      value: val,
      isFlipped: false,
      isMatched: false
    }));
    
    console.log(`Generated ${this.cards.length} cards`);
    this.resetStats();
  }

  getValues(count: number) {
    let source = this.icons;
    if (this.type === 'numbers') source = this.numbers;
    if (this.type === 'emojis') source = this.emojis;
    return source.slice(0, count);
  }

  resetStats() {
    this.moves = 0;
    this.matches = 0;
    this.timer = 0;
    this.gameWon = false;
    this.gameStarted = false;
    this.stopTimer();
  }

  startTimer() {
    if (!this.gameStarted) {
      this.gameStarted = true;
      this.timerInterval = setInterval(() => {
        this.timer++;
      }, 1000);
    }
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  flipCard(card: Card) {
    if (card.isFlipped || card.isMatched || this.flippedCards.length === 2 || this.gameWon) return;

    this.startTimer();
    card.isFlipped = true;
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.checkMatch();
    }
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    if (card1.value === card2.value) {
      card1.isMatched = true;
      card2.isMatched = true;
      this.matches++;
      this.flippedCards = [];
      
      if (this.matches === this.totalPairs) {
        this.gameWon = true;
        this.stopTimer();
      }
    } else {
      setTimeout(() => {
        card1.isFlipped = false;
        card2.isFlipped = false;
        this.flippedCards = [];
      }, 1000);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  restart() {
    this.setupGame();
  }
}
