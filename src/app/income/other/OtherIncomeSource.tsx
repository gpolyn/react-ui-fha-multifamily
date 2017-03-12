/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeSource extends React.PureComponent<any, {}> {

  render() {
    console.log("rendering OtherIncomeSource")
    return (
      <div className='other-income'>
        <div className='usage'>
          <div className='display'>
            {this.props.usage}
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
          <button className='apartment-income-destroy' onClick={ () => {this.props.onDelete(this.props.id)} }>
            delete
          </button>
        </div>
      </div>
    );
  }
}
