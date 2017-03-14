/// <reference path="../../interfaces.d.tsx"/>
/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import {ParkingIncomeForm} from './ParkingIncomeForm';
import {ParkingIncomeSource} from './ParkingIncomeSource';

export class ParkingIncome extends React.Component<IIncomeAggregatorProps<IParkingIncome2, IParkingIncome>, IParkingIncome> {
  
  private formVals: IParkingIncome = {
    isIndoor: false,
    totalSquareFeet: undefined,
    monthlyFee: undefined,
    spaces: undefined
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formVals = {...this.formVals, ...this.props.initialValues};
    this.state = {...this.formVals};
  }

  handleDelete(income: any) {
    this.props.onDestroy(income);
  }

  onSubmit() {
    const spacesIsANumber = typeof (this.state.spaces) === 'number';
    const monthlyFeeIsANumber = typeof (this.state.monthlyFee) === 'number';
    if (spacesIsANumber && monthlyFeeIsANumber) {
      this.props.onSave({totalMonthlyIncome: (this.state.monthlyFee * this.state.spaces), ...this.state});
    }
    this.setState(prevState => ({...prevState, ...this.formVals}));
  }

  onChange(data: any) {
    this.setState(prevState => ({...prevState, ...data}));
  }

  render() {
    const {incomes} = this.props;
    return (
      <section className='other-income'>
        <ParkingIncomeForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          css={this.props.css}
          {...this.state}
          />
        {incomes.map(income =>
          <ParkingIncomeSource
            key={income.id}
            {...income}
            {...this.props.css}
            onDelete={this.handleDelete}
            />
        )}
      </section>
    );
  }

}
