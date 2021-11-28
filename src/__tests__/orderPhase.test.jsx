import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from '../App'

test('order phases for happy path', async () => {
  // render app
  render(<App />)

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const chocolateInput = /* no need to wait */
    screen.getByRole('spinbutton', { name: 'Chocolate' })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  const cherriesCheckbox = /* different endpoint, so it could take longer */
    await screen.findByRole('checkbox', { name: 'Cherries' })
  userEvent.click(cherriesCheckbox)

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderSummaryButton)

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.getByRole('heading', { name: 'Toppings: $1.50' })
  expect(toppingsHeading).toBeInTheDocument()

  // check summary option items
  expect(screen.getByText('1 Vanilla')).toBeInTheDocument()
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument()
  expect(screen.getByText('Cherries')).toBeInTheDocument()

  // // alternatively...
  // // const optionItems = screen.getAllByRole('listitem');
  // // const optionItemsText = optionItems.map((item) => item.textContent);
  // // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  userEvent.click(tcCheckbox)

  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i })
  userEvent.click(confirmOrderButton)

  // (L.80) expect 'loading' to show
  const loading = screen.getByText(/loading/i)
  expect(loading).toBeInTheDocument()

  // confirm order number on confirmation page
  const thankYouHeader = /* wait for the POST request */
    await screen.findByRole('heading', { name: /thank you/i })
  expect(thankYouHeader).toBeInTheDocument()

  // (L.80) expect 'loading' to disappear
  const notLoading = screen.queryByText(/loading/i) /* so we don't get an error */
  expect(notLoading).not.toBeInTheDocument()

  const orderNumber = await screen.findByText(/order number/i)
  expect(orderNumber).toBeInTheDocument()

  // click "new order" button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /new order/i })
  userEvent.click(newOrderButton)

  // check that scoops and toppings subtotals have been reset
  // the first line waits for the re-render after updating the totals
  const scoopsTotal = await screen.findByText('Scoops total: $0.00')
  expect(scoopsTotal).toBeInTheDocument()
  const toppingsTotal = screen.getByText('Toppings total: $0.00')
  expect(toppingsTotal).toBeInTheDocument()

  // wait for items to appear so testing library does not throw an error about
  // updating components when components are unmounted and test is over
  await screen.findByRole('spinbutton', { name: 'Vanilla' })
  await screen.findByRole('checkbox', { name: 'Cherries' })
})

test('toppings header is not on summary page if no topping ordered', async () => {
  // render app
  render(<App />)

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' })
  userEvent.clear(vanillaInput)
  userEvent.type(vanillaInput, '1')

  const chocolateInput = /* no need to wait */
    screen.getByRole('spinbutton', { name: 'Chocolate' })
  userEvent.clear(chocolateInput)
  userEvent.type(chocolateInput, '2')

  // find and click order button
  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i })
  userEvent.click(orderSummaryButton)

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' })
  expect(summaryHeading).toBeInTheDocument()

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $6.00' })
  expect(scoopsHeading).toBeInTheDocument()

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i })
  expect(toppingsHeading).not.toBeInTheDocument()
})
