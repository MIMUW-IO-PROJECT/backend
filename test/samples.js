function define(name, value) {
  Object.defineProperty(exports, name, {
    value: value,
    writable: false,
  });
}
define("FORM", {
  endDate: new Date(),
  questions: [
    {
      type: "SINGLE",
      question: "Blah blah blah?",
      answers: ["OK", "NOPE", "WHY?"],
    },
    {
      type: "MULTI",
      question: "Blah blah blah?",
      answers: ["OK", "NOPE", "WHY?"],
    },
    {
      type: "OPEN",
      question: "Blah blah blah?",
      answers: [],
    },
  ],
});
define("ANS", {
  formId: 0,
  answers: [1, [0, 1, 2], "Why not?"],
});
define("RES", {
  formId: 0,
  results: [[0, 0, 0], [0, 0, 0], []],
});

Object.freeze(exports);
