/**
 * Stripe Client Configuration
 * 
 * Note: Stripe instances are created in API routes to avoid build-time issues
 */

export function formatAmountForDisplay(amount: number, currency: string = 'usd'): string {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency.toUpperCase(),
    currencyDisplay: 'symbol',
  })
  return numberFormat.format(amount / 100)
}

export function formatAmountForStripe(amount: number, currency: string = 'usd'): number {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency.toUpperCase(),
  })
  const parts = numberFormat.formatToParts(amount)
  let zeroDecimalCurrency = true
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100)
}

