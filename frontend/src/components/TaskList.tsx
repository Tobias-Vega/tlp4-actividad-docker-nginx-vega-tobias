import type { Task } from '../types/task'
import './TaskStyles.css'

type Props = {
  tasks: Task[]
  onEdit: (task: Task) => void
  onRemove: (id: string) => Promise<void>
  onToggle: (task: Task) => Promise<void>
  loading?: boolean
  error?: string | null
}

export default function TaskList({ tasks, onEdit, onRemove, onToggle, loading, error }: Props) {
  if (loading) return <div className="tp-loading">Cargando tareas...</div>
  if (error) return <div className="tp-error">Error: {error}</div>

  return (
    <div className="tp-list-wrap">
      {tasks.length === 0 ? <p className="tp-empty">No hay tareas.</p> : (
        <ul className="tp-list">
          {tasks.map((task) => (
            <li key={task.id} className="tp-item">
              <div className="tp-item-main">
                <div>
                  <div className="tp-item-title">{task.title}</div>
                  <div className="tp-item-desc">{task.description}</div>
                </div>
                <div className={`tp-badge ${task.status === 'pending' ? 'tp-pending' : 'tp-completed'}`}>{task.status}</div>
              </div>
              <div className="tp-item-actions">
                <button className="tp-btn" onClick={() => void onToggle(task)}>{task.status === 'pending' ? 'Marcar completada' : 'Marcar pendiente'}</button>
                <button className="tp-btn" onClick={() => onEdit(task)}>Editar</button>
                <button className="tp-btn tp-btn-danger" onClick={() => void onRemove(task.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
