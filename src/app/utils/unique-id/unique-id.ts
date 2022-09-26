export let lastId = 0

export const uniqueId = () => {
  const prefix = 'pr_id_'
  lastId++
  return `${prefix}${lastId}`
}
