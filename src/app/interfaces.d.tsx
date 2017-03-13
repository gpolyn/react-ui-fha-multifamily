interface IIncome {
  readonly totalMonthlyIncome: number;
}

interface IIdentified {
  readonly id: number
}

interface IIncomeAggregatorProps<T extends IIncome, U> {
  incomes: ReadonlyArray<Readonly<U & IIdentified>>;
  initialValues?: U;
  onSave: (val: T & U) => void | any;
  onDestroy: (id: any) => void | any;
  [propName: string]: any;
}
