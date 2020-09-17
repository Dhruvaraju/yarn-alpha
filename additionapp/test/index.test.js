const test = require("ava");
const addition = require("../src/index");

test("Check addition is working", (element) => {
  element.is(addition(2, 3), 5);
});
