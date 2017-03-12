interface IIncome {
  readonly totalMonthlyIncome: number;
}

interface IIdentified {
  readonly id: any
}

interface IIncomeAggregatorProps<T extends IIncome, U> {
  incomes: ReadonlyArray<Readonly<U & IIdentified>>;
  defaultValues?: U;
  onSave: (val: T & U) => void | any;
  onDestroy: (id: any) => void | any;
}
