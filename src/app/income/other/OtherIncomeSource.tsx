/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeSource extends React.PureComponent<any, {}> {

  render() {
    console.log("rendering OtherIncomeSource")
    const deleteCssClasses = 'simple-income-source-destroy destroy-item';
    return (
      <div className={this.props.containerClassName}>
        <div className='use'>
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
          <button className={deleteCssClasses} onClick={ () => {this.props.onDelete(this.props.id)} }>
            delete
          </button>
        </div>
      </div>
    );
  }
}
