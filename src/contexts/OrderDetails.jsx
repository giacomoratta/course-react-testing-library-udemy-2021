import { createContext, useContext, useState, useMemo, useEffect } from 'react'
import { pricePerItem } from '../constants'
import { formatCurrency } from '../utilities'

const OrderDetails = createContext()

// create custom hook to check whether we are inside a provider
export function useOrderDetails () {
  const context = useContext(OrderDetails)

  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider')
  }

  return context
}

function calculateSubTotal (optionType, optionCounts) {
  let optionCount = 0
  for (const count of optionCounts[optionType].values()) {
    optionCount += count
  }
  return optionCount * pricePerItem[optionType]
}

export function OrderDetailsProvider (props) {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map()
  })

  const zeroCurrency = formatCurrency(0)

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency
  })

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal('scoops', optionCounts)
    const toppingsSubTotal = calculateSubTotal('toppings', optionCounts)
    const grandTotal = scoopsSubTotal + toppingsSubTotal
    setTotals({
      scoops: formatCurrency(scoopsSubTotal),
      toppings: formatCurrency(toppingsSubTotal),
      grandTotal: formatCurrency(grandTotal)
    })
  }, [optionCounts])

  const value = useMemo(() => {
    function updateItemCount (itemName, newItemCount, optionType) {
      const newOptionCounts = { ...optionCounts }
      const optionCountMap = optionCounts[optionType]
      optionCountMap.set(itemName, parseInt(newItemCount))
      setOptionCounts(newOptionCounts)
    }

    function resetOrder () {
      setOptionCounts({
        scoops: new Map(),
        toppings: new Map()
      })
    }

    // getter: object containing option counts for scoops, toppings, subtotals and totals
    // setter: updateOptionCount
    return [{ ...optionCounts, totals }, updateItemCount, resetOrder]
  }, [optionCounts, totals])

  return <OrderDetails.Provider value={value} {...props} />
}
