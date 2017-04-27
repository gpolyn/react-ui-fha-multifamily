/// <reference path="./interfaces.d.tsx"/>
import * as React from 'react';

export class OtherIncomeSource extends React.PureComponent<any, {}> {

  render() {
    console.log("rendering OtherIncomeSource")
    const deleteCssClasses = 'mdl-button mdl-js-button mdl-button--icon';
    return (
      <tr className={this.props.incomeSourceContainerName}>
        <td className='use'>
          <div className='display'>
            {this.props.usage}
          </div>
        </td>
        <td className='square-feet'>
          <div className='display'>
            {this.props.squareFeet}
          </div>
        </td>
        <td className='monthly-rent'>
          <div className='display'>
            {this.props.monthlyRent}
          </div>
        </td>
        <td>
          <div className='delete-container'>
            <button className={deleteCssClasses} onClick={ () => {this.props.onDelete(this.props.id)} }>
              <i className="material-icons">remove_circle_outline</i>
            </button>
          </div>
        </td>
      </tr>
    );
  }
}
