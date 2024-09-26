/* eslint-disable no-undef */
// describe("First test suite",()=>{
//     test("First case",()=>{
//         expect(false).toBe(true);
//     })
// })

const todoList = require("../todo");

const { all, markAsComplete, add } = todoList();

describe("Todo List test suit", () => {
  beforeAll(() => {
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date(),
    });
  });
  test("Should add new todo", () => {
    const todocount = all.length;
    add({
      title: "Test todo",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todocount + 1);
  });

  test("Should mark as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });
});
