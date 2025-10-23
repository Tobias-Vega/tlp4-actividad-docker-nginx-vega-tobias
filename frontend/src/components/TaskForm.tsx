import { useEffect, useState } from 'react'
import type { Task } from '../types/task'
import { tasksApi } from '../services/tasksApi'
import './TaskStyles.css'

type Props = {
  task?: Task | null
  onSaved?: (task: Task) => void
}
export default function TaskForm({ task, onSaved }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description || '')
      // status is managed by the backend; do not expose in the form
    } else {
      setTitle('')
      setDescription('')
      // default status will be set by backend
    }
  }, [task])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (task) {
        const updated = await tasksApi.update(task.id, { title, description })
        onSaved?.(updated)
      } else {
        const created = await tasksApi.create({ title, description })
        onSaved?.(created)
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="tp-form">
      <div className="tp-field">
        <label className="tp-label">Título</label>
        <input className="tp-input" required value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="tp-field">
        <label className="tp-label">Descripción</label>
        <input className="tp-input" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="tp-actions">
        <button className="tp-btn tp-btn-primary" type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
      </div>
    </form>
  )
}
