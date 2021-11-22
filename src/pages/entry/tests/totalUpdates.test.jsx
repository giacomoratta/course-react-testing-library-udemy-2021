// Functionality tests

import { render, screen } from '../../../test-utils/testing-library-utils'
import userEvent from '@testing-library/user-event'
import Options from '../Options'

test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType='scoops' />)

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText('Scoops total: $', { exact: false })
  expect(scoopsSubtotal).toHaveTextContent('0.00')

  // update vanilla scoops to 1 and check subtotal
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla'})
  userEvent.clear(vanillaInput) // just clear the input
  userEvent.type(vanillaInput, '1')
  expect(scoopsSubtotal).toHaveTextContent('2.00')

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate'})
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')
  expect(scoopsSubtotal).toHaveTextContent('6.00')
})

test('update topping subtotal when toppings change', async () => {
  render(<Options optionType='toppings' />)

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText('Toppings total: $', { exact: false })
  expect(toppingsSubtotal).toHaveTextContent('0.00')

  // add cherries topping
  const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries'})
  userEvent.click(cherriesInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')

  // add hot fudge topping
  const hotFudgeInput = await screen.findByRole('checkbox', { name: 'Hot fudge'})
  userEvent.click(hotFudgeInput)
  expect(toppingsSubtotal).toHaveTextContent('3.00')

  // remove hot fudge topping
  userEvent.click(hotFudgeInput)
  expect(toppingsSubtotal).toHaveTextContent('1.50')
})
