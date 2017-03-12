/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateStringField = this.updateStringField.bind(this);
    this.updateNumericField = this.updateNumericField.bind(this);
  }

  handleSubmit(event: React.FormEvent<any>) {
    this.props.onSubmit();
    event.preventDefault();
  }

  render() {
    const {usage, squareFeet, monthlyRent} = this.props;
    return (
      <form onSubmit={this.handleSubmit} id={this.props.containerCSSId}>
        <label>
          usage
          <input name='usage' className={this.props.usageInputClassName} type='text' value={usage} onChange={this.updateStringField}/>
        </label>
        <label>
          square feet
          <input name='squareFeet' className={this.props.squareFeetInputClassName} type='number' value={this.fmt(squareFeet)} onChange={this.updateNumericField}/>
        </label>
        <label>
          monthly rent
          <input name='monthlyRent' className={this.props.monthlyRentInputClassName} type='number' value={this.fmt(monthlyRent)} onChange={this.updateNumericField}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
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


  /*
  public static defaultProps: Partial<IOtherIncome> = {
    usage: 'ignite'
  }
  */

}
