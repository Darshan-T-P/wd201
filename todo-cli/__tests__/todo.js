/* eslint-disable no-undef */
// describe("First test suite",()=>{
//     test("First case",()=>{
//         expect(false).toBe(true);
//     })
// })

const todoList = require("../todo");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("Todo List test suit", () => {
  beforeAll(() => {
    const dateToday = new Date();
    add({
      title: "Test todo 1",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test todo 2",
      completed: false,
      dueDate: new Date(new Date().setDate(dateToday.getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Test todo 3",
      completed: false,
      dueDate: new Date(new Date().setDate(dateToday.getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("Should add new todo", () => {
    const todocount = all.length;
    add({
      title: "Test todo add",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(all.length).toBe(todocount + 1);
    all.pop();
  });

  test("Should mark as Complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Should retrive overdue items", () => {
    const overduesTO = overdue();
    expect(overduesTO.length).toBe(1);
    expect(overduesTO[0].title).toBe("Test todo 2");
  });

  test("Should retrieve due today items", () => {
    const todayTodos = dueToday();
    console.log(todayTodos);
    expect(todayTodos.length).toBe(1);
    expect(todayTodos[0].title).toBe("Test todo 1");
  });

  test("Should retrive duelater items", () => {
    const duelaterTo = dueLater();
    expect(duelaterTo.length).toBe(1);
    expect(duelaterTo[0].title).toBe("Test todo 3");
  });
});
