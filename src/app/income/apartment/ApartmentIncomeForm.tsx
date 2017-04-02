/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ApartmentIncomeForm extends React.PureComponent<any, any> {

  constructor(props: any) {
    super(props);
    this.updateNumericField = this.updateNumericField.bind(this);
  }

  render() {
    const {squareFeet, units, bedroomCount, monthlyRent} = this.props;
    const options = [0, 1, 2, 3, 4].map((bedrooms) =>
      <option key={bedrooms} value={bedrooms}>{bedrooms}</option>
    );
    return (
        <tr id='new-apartment-income'>
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
                <button className='add-apartment-income add-item' onClick={this.props.onSubmit} value='Submit'/>
              </div>
            </td>
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
