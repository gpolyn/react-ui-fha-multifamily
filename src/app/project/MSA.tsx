import * as React from 'react';

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
];

export class MSA extends React.PureComponent<any, any> {
  render() {
    const options = msaOptions.map(msa =>
      <option key={msa} value={msa}>{msa}</option>
    );
    return (
      <div id='metropolitan-area'>
        <label>
          Metropolitan Statistical Area Waiver:
        <select id='high-cost-setting' name='metropolitan_area_waiver' value={this.props.value} onChange={this.props.onChange}>
          {options}
        </select>
        </label>
      </div>
    );
  }
}
