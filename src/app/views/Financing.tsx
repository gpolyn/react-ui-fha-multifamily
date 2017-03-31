import * as React from 'react';
import {MinLimitedNumericInput, MaskedNumericInput, MinMaxLimitedNumericInput} from '../shared/MaskedNumericInput';
import {MaskedNumericIsPercentInput} from '../shared/MaskedNumericIsPercentInput';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';
import {OverrideableCheckboxControl} from '../shared/OverrideableCheckboxControl';
import {PercentableInput} from '../shared/PercentableInput';
import {SharedInput2} from '../shared/SharedInput2';

export function Financing(props: any){

  const onChange = props.onChange;

  const RequiredMinMaxField = (params: any) => {
    const {name, id, label, min, max} = params;
    const value = props[name];
    return (
      <div><label>
        {label}<span className='required'>*</span>
        <SharedInput2 onChange={props.onChange} valKey={name}>
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
  };

  const min0Field = (params: any) => {
    const {name, id, label, isRequired} = params;
    const value = props[name];
    return (
      <div><label>
        {label}
        {isRequired &&
          <span className='required'>*</span>
        }
        <SharedInput2 onChange={onChange} valKey={name}>
          <MinLimitedNumericInput
            value={value}
            className={isRequired ? 'required' : 'optional'}
            name={name}
            min={0}
            id={id}
            />
        </SharedInput2>
      </label></div>);
  };

  const OptionalMin0Field = (params: any) => {
    return min0Field({ ...params, isRequired: false });
  };

  const RequiredMin0Field = (params: any) => {
    return min0Field({ ...params, isRequired: true });
  };

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
        <SharedInput2 onChange={onChange} valKey='transaction_type'>
          <OverrideableRadioControl id='transaction-amount-type-selector' value={props.transaction_type} data-options={transactionTypeOptions} />
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
        <div>
          <SharedInput2 onChange={onChange} valKey='annual_replacement_reserve_per_unit'>
            <MinLimitedNumericInput
              value={props.annual_replacement_reserve_per_unit}
              className='optional'
              min={0}
              id='annual-replacement-reserves-per-unit'
              />
          </SharedInput2>
        </div>
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
        <div className='costs-left costs'>
          <div>
            <label htmlFor='financing-fee'>
              financing fee
            </label>
            <SharedInput2 onChange={onChange} valKey='financing_fee'> 
              <PercentableInput value={props.financing_fee} isPercent={props.financing_fee_is_percent_of_loan}>
                <MinLimitedNumericInput id='financing-fee' min={0} />
              </PercentableInput>
            </SharedInput2 >
          </div>
        </div>
        <div className='costs-right costs'>
          <SharedInput2 onChange={onChange} valKey='financing_fee_is_percent_of_loan'> 
            <OverrideableCheckboxControl id='financing-fee-percent' value={props.financing_fee_is_percent_of_loan}/>
          </SharedInput2>
        </div>
      </div>
      <div id='title-container'>
        <div className='costs-left costs'>
          <div>
            <label htmlFor='title-and-recording'>
              title & recording
            </label>
            <SharedInput2 onChange={onChange} valKey='title_and_recording'> 
              <PercentableInput value={props.title_and_recording} isPercent={props.title_and_recording_is_percent_of_loan}>
                <MinLimitedNumericInput id='title-and-recording' min={0} />
              </PercentableInput>
            </SharedInput2 >
          </div>
        </div>
        <div className='costs-right costs'>
          <SharedInput2 onChange={onChange} valKey='title_and_recording_is_percent_of_loan'> 
            <OverrideableCheckboxControl id='title-and-recording-percent' value={props.title_and_recording_is_percent_of_loan}/>
          </SharedInput2>
        </div>
      </div>
    </div>
  );
}
