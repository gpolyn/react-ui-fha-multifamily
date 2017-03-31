import * as React from 'react';
import {DollarSpan} from '../shared/DollarSpan';
import {EffectiveGrossIncome} from '../egi/EffectiveGrossIncome';

export function OperatingIncome(props: any){

  const residential = (
      <EffectiveGrossIncome
        onChange={props.onChange}
          containerId='residential-income'
        occupancyPercent={props.residential_occupancy_percent}
        maxOccupancyPercent={props.max_residential_occupancy_percent}
        type='residential'
        inputId='residential-occupancy-percent'
        inputClassName='occupancy-percent'
        name='residential_occupancy_percent'
        grossIncome={props.totalGrossResidential}
        egi={props.residentialEGI}
        />
    );

    const commercial = (
        <EffectiveGrossIncome
          onChange={props.onChange}
          containerId='commercial-income'
          occupancyPercent={props.commercial_occupancy_percent}
          maxOccupancyPercent={props.max_commercial_occupancy_percent}
          inputId='commercial-occupancy-percent'
          inputClassName='occupancy-percent'
          type='commercial'
          name='commercial_occupancy_percent'
          grossIncome={props.totalGrossCommercial}
          egi={props.commercialEGI}
          />
    );

    return (
      <div id='operating-income' className='operating-income'>
        {residential}
        {commercial}
        <div id='effective-income-container'>
          <div className='left'>
            effective income
          </div>
          <div className='right'>
            <DollarSpan id='effective-income' value={props.commercialEGI + props.residentialEGI} />
          </div>
        </div>
      </div>
    );

}
