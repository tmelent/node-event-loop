/**
 * Промисы - это объект, который содержит своё состояние, возвращается асинхронно выполняющимися функциями
 * Имеет три состояния: pending, fulfilled, rejected
 * pending - еще выполняется
 * fulfilled - разрешен без ошибок
 * rejected - есть ошибки
 */

// проверяет, равно ли число пяти или нет
const isFive = (num: number): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    num === 5 ? resolve(5) : reject(new Error("число не равно пяти"));
  });
};

export const executePromiseDemo = async () => {
  // resolved
  isFive(5)
    .then((i) => {
      console.log(`Promise resolved: ${i}`);
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(isFive(4).catch((e) => console.log(e))); // fulfilled

  // rejected
  isFive(9)
    .then((i) => {
      console.log(`Promise resolved: ${i}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
