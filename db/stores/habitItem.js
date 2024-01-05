/* eslint-disable prettier/prettier */
import Ajv from 'ajv'
import Datastore from 'nedb-promises'
import { habitItemSchema } from '../schemas/habitItem'

class HabitItemStore {
  constructor() {
    const ajv = new Ajv({ allErrors: true, useDefaults: true })
    this.schemaValidator = ajv.compile(habitItemSchema)
    const dbPath = `${process.cwd()}/habitStore.db`
    this.db = Datastore.create({ filename: dbPath, timestampData: true })
  }

  validate(data) {
    return this.schemaValidator(data)
  }

  create(data) {
    try {
      const isValid = this.validate(data)
      if (isValid) {
        return this.db.insert(data)
      }

      return 'Invalid data'
    } catch (error) {
      return 'Something went wrong'
    }
  }

  async getOne(_id) {
    try {
      const habit = await this.db.findOne({ _id }).exec()
      if (habit) return habit

      return 'Habit is not found'
    } catch (error) {
      return 'Something went wrong'
    }
  }

  async getAll() {
    try {
      const habits = await this.db.find()
      if (habits) return habits

      return 'No habit'
    } catch (error) {
      return 'Something went wrong'
    }
  }

  async rename(_id, name) {
    try {
      const habit = await this.getOne(_id)
      if (habit) {
        const success = (await this.db.updateOne({ _id }, { title: name })) === 1
        if (success) {
          return this.getOne(_id)
        }

        throw new Error('Renaming failed')
      }

      return 'Habit is not found'
    } catch (error) {
      return 'Something went wrong'
    }
  }

  async deleteOne(_id) {
    const habit = await this.getOne(_id)
    if (habit) {
      const success = (await this.db.deleteOne({ _id })) === 1
      if (success) return habit
      throw new Error('Deletion failed')
    }

    return 'Habit is not found'
  }
}

const db = new HabitItemStore()
export default db
