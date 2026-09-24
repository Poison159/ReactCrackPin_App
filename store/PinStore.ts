import { makeAutoObservable } from "mobx";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface BestTime {
  id: string;
  timeToSpare: number;
  date: string;
}

const STORAGE_KEY = "crackpin:bestTimes";
const MAX_RECORDS = 3;

class PinStore {
  currGuess: Array<number> = [];
  secondsLeft: number = 60;
  visible: boolean = false;
  pin: number[] = [];
  won: boolean = false;
  attempts: any[] = [];
  timeToSpare: number = 0;
  snackMsg: string = "";
  bestTimes: BestTime[] = [];
  isTop3Win: boolean = false;
  lastWinId: string = "";

  constructor() {
    makeAutoObservable(this);
    this.loadBestTimes();
  }

  recordWin = (timeToSpare: number) => {
    const entry: BestTime = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      timeToSpare,
      date: new Date().toISOString(),
    };

    const next = [...this.bestTimes, entry]
      .sort((a, b) => b.timeToSpare - a.timeToSpare)
      .slice(0, MAX_RECORDS);

    this.isTop3Win = next.some((item) => item.id === entry.id);
    this.lastWinId = entry.id;
    this.bestTimes = next;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(this.bestTimes)).catch(() => {});
  };

  private loadBestTimes = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.bestTimes = parsed;
        }
      }
    } catch (e) {}
  };

  addDigit = (digit: number) => {
    if (this.currGuess.length < 4)
      this.currGuess.push(digit);
  }

  removeDigit = () => { this.currGuess.pop(); }

  removeAll = () => { this.currGuess = []; }

  setWon = (val: boolean) => { this.won = val; }

  setPin = (val: number[]) => { this.pin = val; }

  setSnackMsg = (val: string) => { this.snackMsg = val }

  setAttempts = (val: any[]) => { this.attempts = val; }

  setVisible = (val: boolean) => { this.visible = val; }

  setTimeToSpare = (val: number) => { this.timeToSpare = val }

  setSecondsLeft = (seconds: number) => { this.secondsLeft = seconds; }

  removeOneSecond = () => { this.secondsLeft = this.secondsLeft - 1; }
}

export default PinStore;