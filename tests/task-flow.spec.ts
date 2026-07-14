import { test, expect } from '@playwright/test'

test.beforeAll(async ({ playwright }) => {
  // Fresh CI databases don't have this user yet; local dev DBs already do (400 = already registered, fine either way).
  const apiContext = await playwright.request.newContext({ baseURL: 'http://localhost:3000' })
  const res = await apiContext.post('/auth/register', {
    data: { email: 'test@gmail.com', password: '1234' },
  })
  if (res.status() !== 400 && !res.ok()) {
    throw new Error(`Failed to seed test user: ${res.status()} ${await res.text()}`)
  }
  await apiContext.dispose()
})

test('A user can log in, create a task, and view it in the list', async ({ page }) => {
  // 1. Go to the login page
  await page.goto('/login')

  // 2. Autenticate with valid credentials
  await page.getByPlaceholder('Email').fill('test@gmail.com')
  await page.getByPlaceholder('Password').fill('1234')
  await page.getByRole('button', { name: 'Ingresar' }).click()

  // 3. Wait for the home page to load and check that the URL is correct
  await expect(page).toHaveURL('/')

  // 4. Create a new task
  const taskTitle = `Comprar pan ${Date.now()}`
  await page.getByPlaceholder('Ej. Elaborar el proyecto final').fill(taskTitle)
  await page.getByRole('button', { name: 'Agregar tarea' }).click()

  // 5. Check that the new task is visible in the list
  await expect(page.getByText(taskTitle)).toBeVisible()
})
