import { Property } from "./BoligSidenService";
export function calculateBankExpenses(
  property: Property,
  downPayment: number,
  years: number
) {
  const MULTIPLIER = 0.003885;
  const loanSize = property.paymentCash - downPayment;
  const monthlyPayment = loanSize * MULTIPLIER;
  const monthlyAfdrag = monthlyPayment * 0.637356987;
  const monthlyRent = monthlyPayment - monthlyAfdrag;

  const amountPaidInRentForPeriod = monthlyRent * 12 * years;
  const amountRemaining = loanSize - monthlyAfdrag * 12 * years;

  return {
    monthlyPayment,
    amountPaidInRentForPeriod,
    amountRemaining,
    monthlyAfdrag,
    monthlyRent,
  };
}
