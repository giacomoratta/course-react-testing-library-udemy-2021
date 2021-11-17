import axios from 'axios'
import { useEffect, useState } from 'react'
import Row from 'react-bootstrap/Row'
import ScoopOptions from './ScoopOptions'
import ToppingOptions from './ToppingOptions'

export default function Options({ optionType }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    // optionType is 'scoops' or 'toppings'
    axios.get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => { /* TODO */ })
  }, [optionType])

  // TODO: replace null with ToppingOption when available
  const ItemComponent = optionType === 'scoops' ? ScoopOptions : ToppingOptions

  const optionItems = items.map(item => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ))

  return <Row>{optionItems}</Row>
}
