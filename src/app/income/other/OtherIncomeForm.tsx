/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStringField = this.updateStringField.bind(this);
    this.updateNumericField = this.updateNumericField.bind(this);
  }

  private updateStringField(e: any) {
    this.props.onChange({[e.target.name]: e.target.value});
  }

  private updateNumericField(e: any) {
    const target = e.target;
    const parsedVal = parseInt(target.value, 10) || '';
    const name = target.name;
    this.props.onChange({[name]: parsedVal});
  }

  private fmt(fieldVal: any) {
    return fieldVal || '';
  }

  handleSubmit(event: React.FormEvent<any>) {
    this.props.onSubmit();
    event.preventDefault();
  }

  render() {
    const {usage, squareFeet, monthlyRent} = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          usage
          <input name='usage' className='usage' type='text' value={usage} onChange={this.updateStringField}/>
        </label>
        <label>
          square feet
          <input name='squareFeet' className='apartment-square-feet' type='number' value={this.fmt(squareFeet)} onChange={this.updateNumericField}/>
        </label>
        <label>
          monthly rent
          <input name='monthlyRent' className='apartment-monthly-rent' type='number' value={this.fmt(monthlyRent)} onChange={this.updateNumericField}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }

  /*
  public static defaultProps: Partial<IOtherIncome> = {
    usage: 'ignite'
  }
  */

}
