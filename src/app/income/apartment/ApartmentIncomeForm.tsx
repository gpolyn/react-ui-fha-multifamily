/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ApartmentIncomeForm extends React.PureComponent<any, any> {

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
    const {squareFeet, units, bedroomCount, monthlyRent} = this.props;
    const options = [0, 1, 2, 3, 4].map((bedrooms) =>
      <option key={bedrooms} value={bedrooms}>{bedrooms}</option>
    );
    return (
        <tr id='new-apartment-income'>
          <form onSubmit={this.handleSubmit}>
            <td>
              <select name='bedroomCount' className='apartment-bedroom-count' value={bedroomCount} onChange={this.updateNumericField}>
                {options}
              </select>
            </td>
            <td>
              <input name='units' className='apartment-unit-count' type='number' value={this.fmt(units)} onChange={this.updateNumericField}/>
            </td>
            <td>
              <input name='squareFeet' className='apartment-square-feet' type='number' value={this.fmt(squareFeet)} onChange={this.updateNumericField}/>
            </td>
            <td>
              <input name='monthlyRent' className='apartment-monthly-rent' type='number' value={this.fmt(monthlyRent)} onChange={this.updateNumericField}/>
            </td>
            <td>
              <div className='add'>
                <input className='add-apartment-income add-item' type='submit' value='Submit'/>
              </div>
            </td>
          </form>
        </tr>
    );
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
