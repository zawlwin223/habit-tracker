import { useEffect, useState } from 'react'
import { habitAPI } from './api/habit.api'

/**
 *
 * This is a description of how you can use habitAPI in this project
 */

function App() {
  const [initialData, setInitialData] = useState(null)

  useEffect(() => {
    habitAPI.getHabits().then((habits) => {
      setInitialData(habits)
    })
  }, [])

  const createNewHabit = async () => {
    try {
      const habit = {
        title: 'Testing',
        description: 'Nani'
      }

      habitAPI.createHabit(habit).then((habit) => setInitialData([...initialData, habit]))
    } catch (reason) {
      console.log(`Cannot create a new habit because of ${reason}`)
    }
  }

  if (!initialData) {
    return <h1>Loading</h1>
  }

  return (
    <div className="container">
      <h2>Welcome</h2>

      {initialData.map((data) => {
        return (
          <div key={data._id}>
            <h1>{data.title}</h1>
            <button
              onClick={async () => {
                const habit = await habitAPI.deleteHabit(data._id)
                console.log(habit)
                const updatedHabits = initialData.filter((d) => d._id !== habit._id)
                setInitialData(updatedHabits)
              }}
            >
              Delete
            </button>

            <button
              onClick={async () => {
                const habit = await habitAPI.renameHabit(data._id, 'New Name')
                const updatedHabits = initialData.map((d) => {
                  if (d._id === habit._id) {
                    d = habit
                  }

                  return d
                })
                setInitialData(updatedHabits)
              }}
            >
              Rename
            </button>
          </div>
        )
      })}

      <button onClick={createNewHabit}>Click me</button>
    </div>
  )
}

export default App
