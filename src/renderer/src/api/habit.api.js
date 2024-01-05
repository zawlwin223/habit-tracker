/* eslint-disable prettier/prettier */
class HabitAPI {
  async getHabits() {
    return await window.api.habit.getAll()
  }

  async getHabit(_id) {
    return await window.api.habit.getOne(_id)
  }

  async createHabit(data) {
    return await window.api.habit.create(data)
  }

  async deleteHabit(_id) {
    return await window.api.habit.deleteOne(_id)
  }

  async renameHabit(_id, name) {
    return await window.api.habit.rename(_id, name)
  }
}

export const habitAPI = new HabitAPI()
