import { render, screen, fireEvent } from '@testing-library/react'
import App, {replaceCamelWithSpaces} from './App'

test('button has correct initial color', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })
  expect(colorButton).toHaveStyle({
    backgroundColor: 'MediumVioletRed'
  })

  fireEvent.click(colorButton)

  expect(colorButton).toHaveStyle({
    backgroundColor: 'MidnightBlue'
  })
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue'
  })
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('checkbox disables button on first click, then enables on second click', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
})

test('button with gray background when disabled, and MediumVioletRed after is enabled', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})

test('button with gray background when disabled, and MidnightBlue after is enabled', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to Midnight Blue' })
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(colorButton)

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })
})

describe('spaces before camel-case capital letters', () => {
  test('works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })
  test('works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
