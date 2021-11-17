import { render, screen } from '@testing-library/react'

import Options from '../Options'

test('displays image for each scoop option from server', () => {
  render(<Options optionType='scoops' />)

  const scoopImages = screen.getAllByRole('img', { name: /scoop$/i })
  expect(scoopImages).toHaveLength(2)

  const altText = scoopImages.map(e => e.alt)
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
})
