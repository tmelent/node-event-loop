import fs from "fs";

/**
 * Event Loop:
 * timers phase - выполняются callback'и setTimeout() и setInterval(), если прошло минимальное время, указанное во втором параметре
 * pending callbacks - выполняются callback'и, отложенные на следующую итерацию event loop
 * idle, prepare - внутренняя подготовка event loop к следующей фазе
 * poll - на этой стадии выполняются I/O callback'и и принимаются новые I/O события
 * check - выполняются callback'и из setImmediate()
 * close callbacks - выполняются callback'и событий, связанных с закрытием соединений (например, сокетов)
 *  */

/**
 * Callback в setTimeout() сработает на фазе timers, если уже прошло минимальное время для его вызова (параметр ms в setTimeout)
 *  */
export const zeroTimeoutFunc = async () => {
  setTimeout(() => {
    console.log(
      "\x1b[32m",
      "timers phase - zeroTimeoutFunc закончила выполнение"
    );
  }, 0);
};

/**
 * Callback в setTimeout() сработает на фазе timers, если уже прошло минимальное время для его вызова (параметр ms в setTimeout)
 *  */
export const secTimeoutFunc = async (callback: () => void) => {
  setTimeout(() => {
    console.log(
      "\x1b[32m",
      "timers phase - secTimeoutFunc закончила выполнение"
    );
    callback();
  }, 1000);
};

/**
 * Callback в setImmediate() выполнится на фазе check
 */
export const immediateFunc = async () => {
  setImmediate(() => {
    console.log("\x1b[32m", `check phase - immediateFunc закончила выполнение`);
  });
};

/**
 * Callback в process.nextTick() срабатывает сразу же, несмотря на то, на какой стадии выполнения находится Event Loop
 *  */
export const nextTickFunc = async () => {
  process.nextTick(() => {
    console.log("\x1b[32m", `nextTickFunc закончила выполнение`);
  });
};

/**
 * Длительная операция, вызванная асинхронно, не блокирует поток, позволяя другим операциям выполняться параллельно
 * Сначала callback попадает в poll, а выполняется затем в pending callbacks
 */
export const readLongFile = async () => {
  console.time("reading long file");
  fs.readFile("../files/longFile.txt", () => {
    /**
     * Если здесь вызвать setTimeout и setImmediate, первым выполнится callback setImmediate, т.к. фаза check наступит раньше фазы timers
     */
    setTimeout(() => {
      console.log("\x1b[32m", `timers phase - setTimeout callback из readFile`);
    }, 0);
    setImmediate(() => {
      console.log(
        "\x1b[32m",
        `check phase - setImmediate callback из readFile`
      );
    });

    console.log(
      "\x1b[32m",
      `pending callbacks - завершилось чтение длинного файла`
    );
  });
};

/**
 * Callback в setInterval() вызывается в фазе timers, как и setTimeout()
 */
export const intervalFunc = async () => {
  return setInterval(() => {
    console.log("\x1b[32m", `timers phase - intervalFunc сработала`);
  }, 400);
};

/** Вызов всех функций */
export const startEventLoopTest = async () => {
  console.log("\x1b[33m", "вызов readLongFile");
  readLongFile();
  console.log("\x1b[33m", `вызов intervalFunc`);
  const intervalId = await intervalFunc();
  console.log("\x1b[33m", "вызов nextTickFunc первый раз");
  nextTickFunc();
  console.log("\x1b[33m", "вызов secTimeoutFunc");

  secTimeoutFunc(() => {
    clearInterval(intervalId); // остановка setInterval() сразу после выполнения setTimeout()
  });
  console.log("\x1b[33m", "вызов immediateFunc");
  immediateFunc();
  console.log("\x1b[33m", "вызов zeroTimeoutFunc");
  zeroTimeoutFunc();
  console.log("\x1b[33m", "вызов nextTickFunc второй раз");
  nextTickFunc();
};
