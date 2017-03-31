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

interface IEffectiveGrossIncome {
  grossIncome: number;
  name?: string;
  occupancyPercent?: number;
  maxOccupancyPercent: number;
  containerId?: string;
  inputClassName?: string;
  inputId?: string;
  egi: number;
  type: string;
  grossIncomeLabelText?: string;
  effectiveIncomeLabelText?: string;
  onChange: (val: any) => void | any;
}
