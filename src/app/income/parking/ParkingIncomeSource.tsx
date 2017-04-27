/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ParkingIncomeSource extends React.PureComponent<any, {}> {

  render() {
    const deleteCssClasses = 'mdl-button mdl-js-button mdl-button--icon';
    return (
      <tr className={this.props.incomeSourceContainerName}>
        <td className='spaces'>
          <div className='display'>
            {this.props.spaces}
          </div>
        </td>
        <td className='indoor-or-outdoor'>
          <div className='display'>
            {this.props.isIndoor ? 'indoor' : 'outdoor'}
          </div>
        </td>
        <td className='total-square-feet'>
          <div className='display'>
            {this.props.totalSquareFeet}
          </div>
        </td>
        <td className='monthly-fee'>
          <div className='display'>
            {this.props.monthlyFee}
          </div>
        </td>
        <td className='delete-container'>
          <button className={deleteCssClasses} onClick={ () => {this.props.onDelete(this.props.id)} }>
            <i className="material-icons">remove_circle_outline</i>
          </button>
        </td>
      </tr>
    );
  }
}
