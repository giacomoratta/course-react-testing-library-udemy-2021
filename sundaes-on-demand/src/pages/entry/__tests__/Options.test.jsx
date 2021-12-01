import { render, screen } from '../../../test-utils/testing-library-utils'

import Options from '../Options'
import userEvent from '@testing-library/user-event'

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />)

  // we know the component is async, so we must use findBy
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altText = scoopImages.map(e => e.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />)

  // we know the component is async, so we must use findBy
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map(e => e.alt)
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
})

test('do not update total if scoops input is invalid', async () => {
  render(<Options optionType='scoops' />)

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })

  // invalid negative number
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '-1')

  const scoopsSubtotal = screen.getByText('Scoops total: $0.00')
  expect(scoopsSubtotal).toBeInTheDocument()
})
