/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ParkingIncomeSource extends React.PureComponent<any, {}> {

  render() {
    const deleteCssClasses = 'parking-income-destroy destroy-item';
    return (
      <div className={this.props.incomeSourceContainerName}>
        <div className='spaces'>
          <div className='display'>
            {this.props.spaces}
          </div>
        </div>
        <div className='indoor-or-outdoor'>
          <div className='display'>
            {this.props.indoorOrOutdoor}
          </div>
        </div>
        <div className='total-square-feet'>
          <div className='display'>
            {this.props.totalSquareFeet}
          </div>
        </div>
        <div className='monthly-fee'>
          <div className='display'>
            {this.props.monthlyFee}
          </div>
        </div>
        <div className='delete-container'>
          <button className={deleteCssClasses} onClick={ () => {this.props.onDelete(this.props.id)} }>
            delete
          </button>
        </div>
      </div>
    );
  }
}
