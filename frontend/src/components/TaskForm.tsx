import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { tasksApi } from '../services/tasksApi'

type Props = {
  task?: Task | null
  onSaved?: (task: Task) => void
  onCancel?: () => void
}

export default function TaskForm({ task, onSaved, onCancel }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Task['status']>('pending')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
    } else {
      setTitle('')
      setDescription('')
      setStatus('pending')
    }
  }, [task])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (task) {
        const updated = await tasksApi.update(task.id, { title, description, status })
        onSaved?.(updated)
      } else {
        const created = await tasksApi.create({ title, description, status })
        onSaved?.(created)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 12, marginBottom: 12 }}>
      <div>
        <label>Título</label>
        <input required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Descripción</label>
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label>Estado</label>
        <select value={status} onChange={(e) => setStatus(e.target.value as Task['status'])}>
          <option value="pending">Pendiente</option>
          <option value="completed">Completado</option>
        </select>
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}
