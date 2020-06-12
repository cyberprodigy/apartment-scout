import { getApprectionationForNext5YearsInAreaPer1Sqm } from "./AreaAppreciationProvider";
import { calculateBankExpenses } from "./BankExpensesCalculator";
import { Property } from "./BoligSidenService";

export type EstimatedProperty = Property & {
  roi: number;
  couldSellFor: number;
};

export function estimateProperties(
  properties: Property[]
): EstimatedProperty[] {
  return properties.map((property) => {
    const bankExpenses = calculateBankExpenses(property, 700000, 5);
    const appreciation =
      getApprectionationForNext5YearsInAreaPer1Sqm(property.postal) *
      property.areaResidential;
    const apartmentCosts = property.paymentExpenses * 12 * 5;

    return {
      ...property,
      roi:
        appreciation -
        (bankExpenses.amountPaidInRentForPeriod - apartmentCosts),
      couldSellFor: property.paymentCash + appreciation,
    };
  });
}
