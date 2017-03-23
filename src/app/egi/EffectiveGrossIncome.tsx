/// <reference path="../interfaces.d.tsx"/>
import * as React from 'react';
import {MaskedNumericInput} from '../shared/MaskedNumericInput';

export class EffectiveGrossIncome extends React.PureComponent<IEffectiveGrossIncome, any> {

  private fmt(num: number){
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$$1,");
  };

  render() {
    return (
      <section id={this.props.containerId} className='income'>
        <div>
          <div className='left'>{this.props.grossIncomeLabelText}</div>
          <div className='right'>
            <span>
              {this.fmt(this.props.grossIncome)}
            </span>
          </div>
        </div>
        <div>
          <div className='left'>
            <label htmlFor=''>
              occupancy rate
            </label>
          </div>
          <div className='right'>
            <MaskedNumericInput
              onChange={this.props.onChange} 
              max={this.props.maxOccupancyPercent}
              min={0}
              value={this.props.occupancyPercent}
              />
          </div>
        </div>
        <div>
          <div className='left'>{this.props.effectiveIncomeLabelText}</div>
          <div className='right'>
            <span>
              {this.fmt(this.props.egi)}
            </span>
          </div>
        </div>
      </section>
    )
  }
}
