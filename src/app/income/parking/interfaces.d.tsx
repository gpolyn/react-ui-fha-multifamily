interface IParkingIncome {
  isIndoor?: boolean;
  totalSquareFeet?: number;
  spaces?: number;
  monthlyFee?: number;
}

interface IParkingIncome2 extends IParkingIncome {
  totalMonthlyIncome: number;
}
