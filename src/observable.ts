import { Observable } from "rxjs";

/**
 * (по документации RxJS)
 * Observable функции позволяют "вернуть" несколько значений, синхронно или асинхронно. Обычные же функции возвращают только одно значение 
 */ 

const observableFunction = new Observable((subscriber) => {
  subscriber.next(4); // синхронный "return" значения
  subscriber.next(5);
  setTimeout(() => {
    subscriber.next(6); // асихнронный "return" значения
    subscriber.complete();
  }, 1000);
});

export const testObservable = async () => {
  observableFunction.subscribe({
    next(x) {
      console.log(`observableFunctionSubscription: ${x}`);
    },
    error(err) {
      console.error(`observableFunctionSubscription: ${err}`);
    },
    complete() {
      console.log("observableFunctionSubscription: finished");
    },
  });
};
