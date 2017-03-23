import * as React from 'react';
import {MaskedNumericInput} from '../shared/MaskedNumericInput';

export class TransactionAmountAndType extends React.PureComponent<any, any> {

  /*
  private type: string;
  private amount: number;
  */

  constructor(props){
    super(props);
    this.typeSelection = this.typeSelection.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  private onChange(e: any){
  };

  private typeSelection(e: any){
  };

  render() {
    return (
      <div id='transaction-amount-container'>
        <div id='transaction-amount-input'>
          <label htmlFor='transaction-amount'>
            transaction amount<span className='required'>*</span>
            <MaskedNumericInput
              onChange={this.onChange} 
              value={this.props.transactionAmount}
              className='required'
              id='transaction-amount'
              />
          </label>
        </div>
        <div id='transaction-amount-type-selector'>
          <label>purchase
            <input type='radio' name='purchase_price_of_project' checked={this.props.transactionType === 'purchase' || !this.props.transactionType} id='purchase' onChange={this.typeSelection}/>
          </label>
          <label>existing debt
            <input type='radio' name='existing_indebtedness' checked={this.props.value === 'refinance'} id='debt' onChange={this.typeSelection}/>
          </label>
        </div>
      </div>
    )
  }
}
