/// <reference path="../../interfaces.d.tsx"/>
/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import {ApartmentIncomeForm} from './ApartmentIncomeForm';
import {ApartmentIncomeSource} from './ApartmentIncomeSource';

export class ApartmentIncome extends React.Component<IIncomeAggregatorProps<IApartmentIncome2, IApartmentIncome>, IApartmentIncome> {
  
  private formVals: IApartmentIncome = {
    bedroomCount: 0,
    squareFeet: undefined,
    monthlyRent: undefined,
    units: undefined
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
    const unitsIsValid = typeof (this.state.units) === 'number' && this.state.units > 0;
    const monthlyRentIsANumber = typeof (this.state.monthlyRent) === 'number';
    if (unitsIsValid && monthlyRentIsANumber) {
      this.props.onSave({totalMonthlyIncome: (this.state.monthlyRent * this.state.units), ...this.state});
    }
    this.setState(prevState => ({...prevState, ...this.formVals}));
  }

  onChange(data: any) {
    this.setState(prevState => ({...prevState, ...data}));
  }

  render() {
    const {incomes} = this.props;
    return (
      <section className='apartment-income'>
        <ApartmentIncomeForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          {...this.state}
          />
        {incomes.map(income =>
          <ApartmentIncomeSource
            key={income.id}
            {...income}
            onDelete={this.handleDelete}
            />
        )}
      </section>
    );
  }

}
