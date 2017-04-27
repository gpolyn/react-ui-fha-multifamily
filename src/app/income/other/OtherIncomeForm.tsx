/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.updateStringField = this.updateStringField.bind(this);
    this.updateNumericField = this.updateNumericField.bind(this);
  }


  render() {
    const {usage, squareFeet, monthlyRent, css} = this.props;
    return (
      <tr id={css.newIncomeContainerName}>
          <td>
            <input name='usage' className={css.usageInputName} type='text' value={this.fmt(usage)} onChange={this.updateStringField}/>
          </td>
          <td>
            <input name='squareFeet' className={css.squareFeetInputName} type='number' value={this.fmt(squareFeet)} onChange={this.updateNumericField}/>
          </td>
          <td>
            <input name='monthlyRent' className={css.monthlyRentInputName} type='number' value={this.fmt(monthlyRent)} onChange={this.updateNumericField}/>
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
