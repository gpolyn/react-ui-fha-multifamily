import * as React from 'react';
import {OverrideableRadioControl} from '../shared/OverrideableRadioControl';
import {OverrideableSelectControl} from '../shared/OverrideableSelectControl';
import {OnChangePayloadObjectInterceptor} from '../shared/OnChangePayloadObjectInterceptor';

export function Project(props: any) {

  const elevatorStatusOptions = [
    'true',
    'false'
  ];

  const affordabilityOpts = [
    {label: 'market', value: 'market', id: 'market'},
    {label: 'affordable', value: 'affordable', id: 'affordable'},
    {label: 'subsidized', value: 'subsidized', id: 'subsidized'}
  ];

  const {onChange, is_elevator_project, metropolitan_area_waiver, affordability} = props;
  const elevator = (
    <div key='elevator-status' id='elevator-status'>
      project has elevator?
      <OnChangePayloadObjectInterceptor valKey='is_elevator_project' onChange={onChange}>
        <OverrideableSelectControl
          id='elevator-status'
          value={is_elevator_project}
          data-options={elevatorStatusOptions}
          />
      </OnChangePayloadObjectInterceptor>
    </div>
  );
  const msa = (
    <div key='metropolitan-area' id='metropolitan-area'>
      <label htmlFor='high-cost-setting'>
        Metropolitan Statistical Area Waiver:
      </label>
      <OnChangePayloadObjectInterceptor valKey='metropolitan_area_waiver' onChange={onChange}>
        <OverrideableSelectControl
          id='high-cost-setting'
          value={metropolitan_area_waiver}
          data-options={msaOptions}
          />
      </OnChangePayloadObjectInterceptor>
    </div>
  );
  const aff = (
      <div key='affordability' id='affordability'>
        apartment rents are
        <OnChangePayloadObjectInterceptor valKey='affordability' onChange={onChange}>
          <OverrideableRadioControl 
           id='affordability' 
           name='affordability'
           value={affordability}
           data-options={affordabilityOpts}
           />
        </OnChangePayloadObjectInterceptor>
      </div>
  );

  return [msa, aff, elevator];
}

const msaOptions = [
	'maximum waiver',
	'standard waiver',
	'no waiver',
	'Albany, NY',
	'Albuquerque, NM',
	'Anchorage, AK',
	'Atlanta, GA',
	'Baltimore, MD',
	'Bangor, ME',
	'Birmingham, AL',
	'Boise, ID',
	'Boston, MA',
	'Buffalo, NY',
	'Burlington, VT',
	'Camden, NJ',
	'Casper, WY',
	'Charleston, WV',
	'Chicago, IL',
	'Cincinnati, OH',
	'Cleveland, OH',
	'Columbia, SC',
	'Columbus, OH',
	'Dallas, TX',
	'Denver, CO',
	'Des Moines, IA',
	'Detroit, MI',
	'Fargo, ND',
	'Fort Worth, TX',
	'Grand Rapids, MI',
	'Greensboro, NC',
	'Hartford, CT',
	'Helena, MT',
	'Honolulu, HI',
	'Houston, TX',
	'Indianapolis, IN',
	'Jackson, MS',
	'Jacksonville, FL',
	'Kansas City, KS',
	'Knoxville, TN',
	'Las Vegas, NV',
	'Little Rock, AR',
	'Los Angeles, CA',
	'Louisville, KY',
	'Lubbock, TX',
	'Manchester, NH',
	'Memphis, TN',
	'Miami, FL',
	'Milwaukee, WI',
	'Minneapolis, MN',
	'Nashville, TN',
	'New Orleans, LA',
	'New York, NY',
	'Newark, NJ',
	'Oklahoma City, OK',
	'Omaha, NE',
	'Philadelphia, PA',
	'Phoenix, AZ',
	'Pittsburgh, PA',
	'Portland, OR',
	'Providence, RI',
	'Richmond, VA',
	'Sacramento, CA',
	'Salt Lake City, UT',
	'San Antonio, TX',
	'San Diego, CA',
	'San Francisco, CA',
	'San Juan, PR',
	'Santa Ana, CA',
	'Seattle, WA',
	'Shreveport, LA',
	'Sioux Falls, SD',
	'Spokane, WA',
	'Springfield, IL',
	'St. Louis, MO',
	'Tampa, FL',
	'Topeka, KS',
	'Tulsa, OK',
	'US Virgin Islands, US Virgin Islands',
	'Washington, DC',
	'Wilmington, DE',
]
