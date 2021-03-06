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
    this.formVals = {...this.formVals, ...props.initialValues};
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
    console.log('ApartmentIncome#render', incomes);
    return (
      <table id='apartment-income'>
        <caption className='income-table'>apartment income</caption>
        <colgroup>
					<col id="apartment-bedroom-count" />
					<col id="apartment-unit-count" />
					<col className="square-footage" id="apartment-square-feet" />
					<col className="monthly-income" id="apartment-monthly-rent" />
					<col id="destroy" />
        </colgroup>
        <thead>
					<tr>
						<th>
							bedrooms<span className='required'>*</span>	
						</th>	
						<th>
							units<span className='required'>*</span>	
						</th>	
						<th>
							square feet
						</th>	
						<th>
							monthly rent<span className='required'>*</span>	
						</th>	
						<th>
						</th>	
					</tr>
				</thead>
        <tbody>
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
        </tbody>
      </table>
    );
  }

}
        /*
        <caption className='income-table'>apartment income</caption>
        */
