import * as React from 'react';
import {MaskedNumericInput, MinMaxLimitedNumericInput} from '../shared/MaskedNumericInput';
import {MaskedNumericIsPercentInput} from '../shared/MaskedNumericIsPercentInput';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';
import {OverrideableCheckboxControl} from '../shared/OverrideableCheckboxControl';
import {PercentableInput} from '../shared/PercentableInput';
import {SharedInput2} from '../shared/SharedInput2';

export class FinanceCosts extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {transaction_type: 'purchase'};
    this.onChange = this.onChange.bind(this);
    this.onNumericValueIsPercentChange = this.onNumericValueIsPercentChange.bind(this);
    this.percentableChange = this.percentableChange.bind(this);
  }

  percentableChange(x: any){
    console.log('percentableChange', x);
  }

  onChange(x: any){
    console.log('onChange', x)
    this.setState(x);
  }

  onNumericValueIsPercentChange(x: any){
    console.log('onNumericValueIsPercentChange', x)
    const key = Object.keys(x)[0];
    const {isPercent, numericValue} = x[key];
    this.setState({[key + '_is_percent_of_loan']: isPercent, [key]: numericValue});
  }

  RequiredMinMaxField(params: any) {
    const {name, id, label, min, max} = params;
    const onChange = this.onChange;
    const value = this.props[name];
    return (
      <div><label>
        {label}<span className='required'>*</span>
        <SharedInput2 onChange={onChange} valKey={name}>
          <MinMaxLimitedNumericInput
            value={value}
            className='required'
            name={name}
            min={min}
            max={max}
            id={id}
            />
        </SharedInput2>
      </label></div>);
  }

  min0Field(params: any) {
    const {name, id, label, isRequired} = params;
    const onChange = this.onChange;
    const value = this.props[name];
    return (
      <div><label>
        {label}
        {isRequired &&
          <span className='required'>*</span>
        }
        <SharedInput2 onChange={onChange} valKey={name}>
          <MaskedNumericInput
            value={value}
            className={isRequired ? 'required' : 'optional'}
            name={name}
            min={0}
            id={id}
            />
        </SharedInput2>
      </label></div>);
  }

  OptionalMin0Field(params: any) {
    return this.min0Field({ ...params, isRequired: false });
  }

  RequiredMin0Field(params: any) {
    return this.min0Field({ ...params, isRequired: true });
  }

  render() {
    console.log('FinanceCosts#render');
    const OptionalMin0Field = this.OptionalMin0Field.bind(this);
    const RequiredMin0Field = this.RequiredMin0Field.bind(this);
    const RequiredMinMaxField = this.RequiredMinMaxField.bind(this);
    const costsLeft = 'costs-left costs';
    const costsRight = 'costs-right costs';

    const transactionTypeOptions = [
      {value: 'purchase', id: 'purchase', label: 'purchase'},
      {value: 'debt', id: 'debt', label: 'debt'}
    ];

    const [amount, request] = [
      {name: 'transaction_amount', id: 'transaction-amount', label: 'transaction amount'},
      {name: 'loan_request', id: 'loan-request', label: 'loan request'}
    ].map(params => RequiredMin0Field(params));

    const [term, rate] = [
      {min: 0, max: 420, name: 'term_in_months', id: 'term-in-months', label: 'term in months'},
      {min: 0, max: 100, name: 'mortgage_interest_rate', id: 'mortgage-interest-rate', label: 'mortgage interest rate'}
    ].map(params => RequiredMinMaxField(params));

    const [value, landValue, thirdParty, organizational, repairs, survey, other] = [
      {name: 'value_in_fee_simple', id: 'value-in-fee-simple', label: 'project value'},
      {name: 'as_is_value_of_land_in_fee_simple', id: 'land-value', label: 'land value'},
      {name: 'third_party_reports', id: 'third-party-reports', label: 'third party reports'},
      {name: 'legal_and_organizational', id: 'legal-and-organizational', label: 'legal & organizational'},
      {name: 'repairs', id: 'repairs-or-improvements', label: 'repairs/improvements'},
      {name: 'survey', id: 'survey', label: 'survey'},
      {name: 'other', id: 'other', label: 'other'}
    ].map(params => OptionalMin0Field(params));

    return (
      <div>
        <div id='transaction-amount-container'>
          <div id='transaction-amount-input'>
            {amount}
          </div>
          <SharedInput2 onChange={this.onChange} valKey='transaction_type'>
            <OverrideableRadioControl id='transaction-amount-type-selector' value={this.state.transaction_type} data-options={transactionTypeOptions} />
          </SharedInput2>
        </div>
        <div className={costsLeft}>
          {term}
          {request}
          <div id='annual-replacement-reserves-per-unit'>
            <label htmlFor='annual-replacement-reserves-per-unit'>
              annual replacement reserves per unit<span className='required'>*</span>
            </label>
          </div>
        </div>
        <div className={costsRight}>
          {rate}
          {value}
          {OptionalMin0Field({name: 'annual_replacement_reserve_per_unit', id: 'annual-replacement-reserves-per-unit', label: ''})}
        </div>
        <div className={costsLeft}>
          {landValue}
          {thirdParty}
          {organizational}
        </div>
        <div className={costsRight}>
          {repairs}
          {survey}
          {other}
        </div>
        <div>
          <div id='special-left-div'>
            <SharedInput2 onChange={this.onNumericValueIsPercentChange} valKey='financing_fee'> 
              <MaskedNumericIsPercentInput numericInputId='financing-fee' isPercentId='financing-fee-percent' name='financing_fee' numericInputLabel='financing fee' isPercentLabel='% of loan' id='financing-fee' className='optional as-percent-possible-input' onChange={this.onNumericValueIsPercentChange} />
            </SharedInput2>
            <div id='special'>
              <SharedInput2 onChange={this.onChange} valKey='title_and_recording'> 
                <PercentableInput value={this.state.title_and_recording} isPercent={this.state.title_and_recording_is_percent_of_loan}>
                  <MaskedNumericInput min={0} />
                </PercentableInput>
              </SharedInput2 >
              <SharedInput2 onChange={this.onChange} valKey='title_and_recording_is_percent_of_loan'> 
                <OverrideableCheckboxControl value={this.state.title_and_recording_is_percent_of_loan}/>
              </SharedInput2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
