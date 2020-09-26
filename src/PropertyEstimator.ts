import { getApprectionationForNext5YearsInAreaPer1Sqm } from "./AreaAppreciationProvider";
import { calculateBankExpenses } from "./BankExpensesCalculator";
import { Property } from "./BoligSidenService";

export type EstimatedProperty = Property & {
  roi: number;
  couldSellFor: number;
  tooExpensive: boolean;
  loan: {
    amount: number;
    monthlyPayment: number;
    remainingLoan: number;
    monthlyAfdrag: number;
    monthlyRent: number;
  };
};

const MY_DOWNPAYMENT = 700000;

export function estimateProperties(
  properties: Property[]
): EstimatedProperty[] {
  return properties.map((property) => {
    const bankExpenses = calculateBankExpenses(property, MY_DOWNPAYMENT, 5);
    const appreciation =
      getApprectionationForNext5YearsInAreaPer1Sqm(property.postal) *
      property.areaResidential;
    const apartmentCosts = property.paymentExpenses * 12 * 5;

    return {
      ...property,
      roi:
        appreciation -
        (bankExpenses.amountPaidInRentForPeriod + apartmentCosts),
      couldSellFor: property.paymentCash + appreciation,
      tooExpensive: property.downPayment > MY_DOWNPAYMENT,
      loan: {
        amount: property.paymentCash - MY_DOWNPAYMENT,
        monthlyPayment: bankExpenses.monthlyPayment,
        remainingLoan: bankExpenses.amountRemaining,
        monthlyAfdrag: bankExpenses.monthlyAfdrag,
        monthlyRent: bankExpenses.monthlyRent,
      },
    };
  });
}
