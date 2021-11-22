import { render, screen } from '@testing-library/react'

import Options from '../Options'
import { OrderDetailsProvider } from '../../../contexts/OrderDetails'

test('displays image for each scoop option from server', async () => {
  render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider })

  // we know the component is async, so we must use findBy
  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altText = scoopImages.map(e => e.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})

test('displays image for each topping option from server', async () => {
  render(<Options optionType='toppings' />, { wrapper: OrderDetailsProvider })

  // we know the component is async, so we must use findBy
  const toppingImages = await screen.findAllByRole('img', { name: /topping$/i })
  expect(toppingImages).toHaveLength(3)

  const altText = toppingImages.map(e => e.alt)
  expect(altText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping'])
})
