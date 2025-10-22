import { useEffect, useState } from 'react'
import './App.css'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import type { Task } from './types/task'
import { tasksApi } from './services/tasksApi'

function App() {
  const [editing, setEditing] = useState<Task | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await tasksApi.list()
      setTasks(data)
    } catch (err: any) {
      setError(err.message || String(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void load() }, [])

  const handleSaved = (task: Task) => {
    setEditing(null)
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id)
      if (exists) return prev.map((t) => (t.id === task.id ? task : t))
      return [task, ...prev]
    })
  }

  const handleRemove = async (id: string) => {
    await tasksApi.remove(id)
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const handleToggle = async (task: Task) => {
    const updated = await tasksApi.update(task.id, { status: task.status === 'pending' ? 'completed' : 'pending' })
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  return (
    <div>
      <h1>Gestor de Tareas</h1>
      <TaskForm
        task={editing}
        onSaved={handleSaved}
        onCancel={() => setEditing(null)}
      />
      <TaskList
        tasks={tasks}
        onEdit={(t) => setEditing(t)}
        onRemove={handleRemove}
        onToggle={handleToggle}
        loading={loading}
        error={error}
      />
    </div>
  )
}

export default App
