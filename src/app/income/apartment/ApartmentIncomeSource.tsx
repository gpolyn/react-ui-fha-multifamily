/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class ApartmentIncomeSource extends React.PureComponent<any, {}> {

  render() {
    const deleteCssClasses = 'apartment-income-destroy destroy-item';
    return (
      <div className={this.props.incomeSourceContainerName}>
        <div className='bedroom-count'>
          <div className='display'>
            {this.props.bedroomCount}
          </div>
        </div>
        <div className='unit-count'>
          <div className='display'>
            {this.props.units}
          </div>
        </div>
        <div className='square-feet'>
          <div className='display'>
            {this.props.squareFeet}
          </div>
        </div>
        <div className='monthly-rent'>
          <div className='display'>
            {this.props.monthlyRent}
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
