import { Injectable } from '@angular/core';
import { ArrayBars } from '../models/ArrayBars';

@Injectable({
  providedIn: 'root',
})
export class ArraysService {

  public arrayLength: number = 10;
  public animationSpeed: number = 1000;

  sortingAnimationsMax: number;
  sortingAnimationsLeft: number;
  sorting: boolean = false;
  isSorted: boolean = false;

  $primaryBars: string = '#0F5257';
  $selectedIndex: string = 'red';
  $swappedIndex: string = 'green';
  $finishedBars: string = '#9C92A3';

  numbers: ArrayBars[];

  completedAnimation = []; // Iterating the array once last time, to show it is completed

  constructor() { }

  resetArray(): void {
    this.numbers = [];
    for (let i = 0; i < this.arrayLength; i++) {
      const randInt = this.randomInteger(20, 500);
      this.numbers.push({ value: randInt, colour: this.$primaryBars });
    }
    this.sortingAnimationsMax = this.numbers.length;
    this.sortingAnimationsLeft = this.numbers.length;
    this.isSorted = false;
    this.sorting = false;
  }

  randomInteger(min, max): number {
    //https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  swap(arr: ArrayBars[], left: number, right: number): void {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
  }

  isArraySorted(array: ArrayBars[]): boolean {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i].value > array[i + 1].value) {
        return false;
      }
      this.completedAnimation.push({ index: i });
    }
    this.completedAnimation.push({ index: array.length - 1 }); // Append last index
    this.isSorted = true;
    return true;
  }

  animateSortedArray(): void {
    const timer = setInterval(() => {
      const action: animationValues = this.completedAnimation.shift();
      if (action) {
        this.numbers[action.index].colour = this.$finishedBars;
      } else {
        clearInterval(timer);
      }
    }, this.animationSpeed);
  }
}

interface animationValues {
  index: number;
}
