/// <reference path="../../interfaces.d.tsx"/>
/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';
import {OtherIncomeForm} from './OtherIncomeForm';
import {OtherIncomeSource} from './OtherIncomeSource';

export class OtherIncome extends React.Component<IIncomeAggregatorProps<IOtherIncome2, IOtherIncome>, IOtherIncome> {
  
  private formVals: IOtherIncome = {
    usage: undefined,
    squareFeet: undefined,
    monthlyRent: undefined
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
    if (typeof (this.state.monthlyRent) === 'number') {
      this.props.onSave({totalMonthlyIncome: this.state.monthlyRent, ...this.state});
    }
    this.setState(prevState => ({...prevState, ...this.formVals}));
  }

  onChange(data: any) {
    this.setState(prevState => ({...prevState, ...data}));
  }

  render() {
    const {incomes} = this.props;
    return (
      <table id={this.props.css.incomeSourceContainerName}>
        <caption className='income-table'>{this.props.caption}</caption>
        <colgroup>
					<col />
					<col className='square-footage' />
					<col className="monthly-income" />
					<col id="destroy" />
        </colgroup>
        <thead>
					<tr>
						<th>
							usage
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
          <OtherIncomeForm
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            css={this.props.css}
            {...this.state}
            />
          {incomes.map(income =>
            <OtherIncomeSource
              key={income.id}
              {...income}
              {...this.props.css}
              onDelete={this.handleDelete}
              />
          )}
        </tbody>
      </table>
    );
  }

}
