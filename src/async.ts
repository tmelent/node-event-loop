const doSomething = async () => {
  return 5;
};

/**
 * Асинхронные функции, записанные с помощью конструкции async/await так же возвращают Promise, как и просто функции написанные через promise
 * Использование await подразумевает то, что функция, вызвавшая эту функцию, будет дожидаться её выполнения, прежде чем продолжать свою работу (аналогично .then() у promise)
 */
export const executeAsyncDemo = async () => {
  console.log(doSomething()); // вернется Promise { 0 }
  console.log(await doSomething()); // вернется 0
  doSomething().then((i) => console.log(i)); // вернется так же 0
};
