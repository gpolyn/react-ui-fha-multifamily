/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ParkingIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateNumericField = this.updateNumericField.bind(this);
  }

  handleSubmit(event: React.FormEvent<any>) {
    this.props.onSubmit();
    event.preventDefault();
  }

  render() {
    const {totalSquareFeet, spaces, isIndoor, monthlyFee, css} = this.props;
    return (
      <form onSubmit={this.handleSubmit} id={css.newIncomeContainerName}>
        <label>
          spaces
          <input name='spaces' className={css.spacesInputName} type='number' value={this.fmt(spaces)} onChange={this.updateNumericField}/>
        </label>
        <select name='indoorOrOutdoor' className={css.indoorOrOutdoorInputName} value={isIndoor} onChange={this.handleSelectorChange}>
          <option value='true'>indoor</option>
          <option value='false'>outdoor</option>
        </select>
        <label>
          total square feet
          <input name='squareFeet' className={css.squareFeetInputName} type='number' value={this.fmt(totalSquareFeet)} onChange={this.updateNumericField}/>
        </label>
        <label>
          monthly fee
          <input name='monthlyFee' className={css.monthlyFeeInputName} type='number' value={this.fmt(monthlyFee)} onChange={this.updateNumericField}/>
        </label>
        <input type='submit' value='Submit'/>
      </form>
    );
  }

  private handleSelectorChange(e: any) {
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

}
