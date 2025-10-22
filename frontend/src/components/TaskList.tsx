import type { Task } from '../types/task'

type Props = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onRemove: (id: string) => Promise<void>
  onToggle: (task: Task) => Promise<void>
  loading?: boolean
  error?: string | null
}

export default function TaskList({ tasks, onEdit, onRemove, onToggle, loading, error }: Props) {
  if (loading) return <div>Cargando tareas...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {tasks.length === 0 ? <p>No hay tareas.</p> : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} style={{ marginBottom: 8 }}>
              <strong>{task.title}</strong> — {task.description}
              <div>
                <button onClick={() => void onToggle(task)}>{task.status === 'pending' ? 'Marcar completada' : 'Marcar pendiente'}</button>
                <button onClick={() => onEdit(task)}>Editar</button>
                <button onClick={() => void onRemove(task.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
