interface IApartmentIncome {
  bedroomCount?: number;
  squareFeet?: number;
  units?: number;
  monthlyRent?: number;
}

interface IApartmentIncome2 extends IApartmentIncome {
  totalMonthlyIncome: number;
}
