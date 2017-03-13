interface IOtherIncome {
  usage?: string;
  squareFeet?: number;
  monthlyRent?: number;
}

interface IOtherIncome2 extends IOtherIncome {
  totalMonthlyIncome: number;
}

interface NewIncomeFormCSS {
  usageInputClassName?: string;
  squareFeetInputClassName?: string;
  monthlyRentInputClassName?: string;
  containerCSSId?: string;
}
