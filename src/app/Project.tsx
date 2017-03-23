import * as React from 'react';
import {OverrideableRadioControl} from './shared/OverrideableRadioControl';
import {OverrideableSelectControl} from './shared/OverrideableSelectControl';
import {OnChangePayloadObjectInterceptor} from './shared/OnChangePayloadObjectInterceptor';

export class Project extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      affordabilty: props.affordabilty,
      is_elevator_project: props.is_elevator_project,
      metropolitan_area_waiver: props.metropolitan_area_waiver
    };
  }

  onChange(data: any){
    console.log('input from child', data);
    this.setState(data);
  }

  render() {
    console.log('Project#render')

    const elevatorStatusOptions = [
      'true',
      'false'
    ];

    const affordabilityOpts = [
      {label: 'market', value: 'market', id: 'market'},
      {label: 'affordable', value: 'affordable', id: 'affordable'},
      {label: 'subsidized', value: 'subsidized', id: 'subsidized'}
    ];

    return(
      <div>
        <div id='elevator-status'>
          project has elevator?
          <OnChangePayloadObjectInterceptor valKey='is_elevator_project' onChange={this.onChange}>
            <OverrideableSelectControl
              id='elevator-status'
              value={this.state.is_elevator_project}
              data-options={elevatorStatusOptions}
              />
          </OnChangePayloadObjectInterceptor>
        </div>
        <div id='metropolitan-area'>
          <label>
            Metropolitan Statistical Area Waiver:
            <OnChangePayloadObjectInterceptor valKey='metropolitan_area_waiver' onChange={this.onChange}>
              <OverrideableSelectControl
                id='high-cost-setting'
                value={this.state.metropolitan_area_waiver}
                data-options={msaOptions}
                />
            </OnChangePayloadObjectInterceptor>
          </label>
        </div>
        <div id='affordability'>
          apartment rents are
          <OnChangePayloadObjectInterceptor valKey='affordability' onChange={this.onChange}>
            <OverrideableRadioControl 
             id='affordability' 
             name='affordability'
             onChange={this.onChange} 
             value={this.state.affordability}
             data-options={affordabilityOpts}
             />
          </OnChangePayloadObjectInterceptor>
        </div>
      </div>
    );
  }
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
