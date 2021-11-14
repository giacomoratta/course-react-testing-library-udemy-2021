import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'

test('button has correct initial color', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue'
  })
  expect(colorButton).toHaveStyle({
    backgroundColor: 'red'
  })

  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({
    backgroundColor: 'blue'
  })
  expect(colorButton.textContent).toBe('Change to red')
})

test('initial conditions', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to blue'
  })
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox disables button on first click, then enables on second click', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('button with gray background when disabled, and red after is enabled', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'red' })
})

test('button with gray background when disabled, and blue after is enabled', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })
})
