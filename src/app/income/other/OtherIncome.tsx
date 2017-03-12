/// <reference path="../../interfaces.d.tsx"/>
/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import {OtherIncomeForm} from './OtherIncomeForm';
import {OtherIncomeSource} from './OtherIncomeSource';

export class OtherIncome extends React.Component<IIncomeAggregatorProps<IOtherIncome2, IOtherIncome>, IOtherIncome> {
  
  private formVals: IOtherIncome;

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.formVals = {
      usage: 'art',
      squareFeet: 456,
      monthlyRent: undefined
    };
    this.state = {...this.formVals};
  }

  handleDelete(income: any) {
    this.props.onDestroy(income);
  }

  onSubmit() {
    if (typeof (this.state.monthlyRent) === 'number') {
      this.props.onSave({totalMonthlyIncome: this.state.monthlyRent, ...this.state});
      this.setState(this.formVals);
    }
  }

  onChange(data: any) {
    this.setState(prevState => ({...prevState, ...data}));
    console.log("after setting state", this.state)
  }

  render() {
    const {incomes} = this.props;
    console.log('OtherIncome#render', this.state)
    return (
      <section className='other-income'>
        <OtherIncomeForm
          onChange={this.onChange}
          onSubmit={this.onSubmit}
          {...this.state}
          />
        {incomes.map(income =>
          <OtherIncomeSource
            key={income.id}
            {...income}
            onDelete={this.handleDelete}
            />
        )}
      </section>
    );
  }
}
