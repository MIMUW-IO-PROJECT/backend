function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    writable: false,
  });
}

define("SINGLE_ANS", "SINGLE");
define("MULTI_ANS", "MULTI");
define("OPEN", "OPEN");

define("MIN_QUESTIONS_AMOUNT", 2);
define("MIN_ANSWERS_AMOUNT", 2);

Object.freeze(exports);
