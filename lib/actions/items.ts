'use server'

export async function createItem(previousState, data: unknown) {
  console.log('previous:', previousState)
  console.log('data:', data)
  return ({status: "success", message: "hello world"})
}
