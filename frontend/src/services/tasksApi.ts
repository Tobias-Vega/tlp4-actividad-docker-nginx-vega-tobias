import type { Task } from '../types/task'

const base = `http://localhost:3000/api/tasks`

async function requestRaw(input: string, init?: RequestInit) {
  const res = await fetch(input, { headers: { 'Content-Type': 'application/json' }, ...init })
  if (!res.ok) throw new Error(await res.text())
  if (res.status === 204) return null
  return res.json()
}

function normalizeTask(serverTask: any): Task {
  if (!serverTask) throw new Error('Invalid task from server')
  const { _id, __v, id, ...rest } = serverTask
  return {
    id: String(_id ?? id),
    title: rest.title,
    description: rest.description,
    status: (rest.status ? String(rest.status).toLowerCase() : 'pending') as Task['status'],
  }
}

export const tasksApi = {
  list: async (): Promise<Task[]> => {
    const data = await requestRaw(base)
    if (!Array.isArray(data)) return []
    return data.map(normalizeTask)
  },
  get: async (id: string): Promise<Task> => {
    const data = await requestRaw(`${base}/${id}`)
    return normalizeTask(data)
  },
  create: async (payload: Omit<Task, 'id'>): Promise<Task> => {
    const body = { ...payload, status: String(payload.status).toUpperCase() }
    const data = await requestRaw(base, { method: 'POST', body: JSON.stringify(body) })
    return normalizeTask(data)
  },
  update: async (id: string, payload: Partial<Omit<Task, 'id'>>): Promise<Task> => {
    const body = { ...payload } as any
    if (body.status) body.status = String(body.status).toUpperCase()
    const data = await requestRaw(`${base}/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
    return normalizeTask(data)
  },
  remove: async (id: string): Promise<void> => {
    await requestRaw(`${base}/${id}`, { method: 'DELETE' })
  },
}
