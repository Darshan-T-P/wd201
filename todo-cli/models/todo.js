"use strict";
const { Op, where } = require("sequelize");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static async addTask(params) {
      return await Todo.create(params);
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      let overdueTasks = await this.overdue();
      console.log(
        overdueTasks.map((task) => task.displayableString()).join("\n") ||
          "No overdue tasks.\n",
      );

      console.log("\n");

      console.log("Due Today");
      let todayTasks = await this.dueToday();
      console.log(
        todayTasks.map((task) => task.displayableString()).join("\n") ||
          "No tasks due today.",
      );

      console.log("\n");

      console.log("Due Later");
      let laterTasks = await this.dueLater();
      console.log(
        laterTasks.map((task) => task.displayableString()).join("\n") ||
          "No tasks due later.\n",
      );
    }

    static async overdue() {
      try {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: { [Op.lt]: today },
          },
          logging: false,
        });
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    static async dueToday() {
      try {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: today,
          },
          logging: false,
        });
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    static async dueLater() {
      try {
        const today = new Date().toISOString().split("T")[0];
        return await Todo.findAll({
          where: {
            dueDate: { [Op.gt]: today },
          },
          logging: false,
        });
      } catch (error) {
        console.error(error);
        return [];
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      try {
        const [updatedRowsCount] = await Todo.update(
          { completed: true },
          {
            where: {
              id: id,
            },
          },
        );
        if (updatedRowsCount === 0) {
          console.log(`No task found with id ${id}.`);
          return false; // No rows updated
        }

        console.log(`Task with id ${id} marked as complete.`);
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }

    displayableString() {
      const formattedDate = (date) => {
        return date.toISOString().split("T")[0]; // Format the date as YYYY-MM-DD
      };
      const checkbox = this.completed ? "[x]" : "[ ]";
      const dueDateStr = this.completed ? "" : this.dueDate;

      return `${this.id}. ${checkbox} ${this.title} ${dueDateStr}`;
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    },
  );

  return Todo;
};
