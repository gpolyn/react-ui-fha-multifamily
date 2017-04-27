/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ParkingIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.updateNumericField = this.updateNumericField.bind(this);
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
  }

  render() {
    const {totalSquareFeet, spaces, isIndoor, monthlyFee, css} = this.props;
    return (
      <tr id={css.newIncomeContainerName}>
          <td>
            <input name='spaces' className={css.spacesInputName} type='number' value={this.fmt(spaces)} onChange={this.updateNumericField}/>
          </td>
          <td>
            <select name='isIndoor' className={css.indoorOrOutdoorInputName} value={isIndoor} onChange={this.handleSelectorChange}>
              <option value='true'>indoor</option>
              <option value='false'>outdoor</option>
            </select>
          </td>
          <td>
            <input name='totalSquareFeet' className={css.squareFeetInputName} type='number' value={this.fmt(totalSquareFeet)} onChange={this.updateNumericField}/>
          </td>
          <td>
            <input name='monthlyFee' className={css.monthlyFeeInputName} type='number' value={this.fmt(monthlyFee)} onChange={this.updateNumericField}/>
          </td>
          <td>
            <div className='add'>
              <button onClick={this.props.onSubmit} className="mdl-button mdl-js-button mdl-button--icon">
                <i className="material-icons">add_circle_outline</i>
              </button>
            </div>
          </td>
      </tr>
    );
  }

  private handleSelectorChange(e: any) {
    this.props.onChange({[e.target.name]: e.target.value == 'true'});
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
