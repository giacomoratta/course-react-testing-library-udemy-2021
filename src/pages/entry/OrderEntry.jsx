import Button from 'react-bootstrap/Button'
import Options from './Options'
import { useOrderDetails } from '../../contexts/OrderDetails'

export default function OrderEntry ({ setOrderPhase }) {
  const [orderDetails] = useOrderDetails()

  const orderDisabled = orderDetails.totals.scoops === '$0.00'

  return (
    <div>
      <Options optionType='scoops' />
      <Options optionType='toppings' />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button disabled={orderDisabled} onClick={() => setOrderPhase('review')}>Order Sundae!</Button>
    </div>
  )
}
