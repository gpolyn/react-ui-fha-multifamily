/// <reference path="../interfaces.d.tsx"/>
import * as React from 'react';
import {ApartmentIncome} from '../income/apartment/ApartmentIncome';
import {OtherIncome} from '../income/other/OtherIncome';
import {ParkingIncome} from '../income/parking/ParkingIncome';
import {SharedInput2} from '../shared/SharedInput2';
import {FinanceCosts} from '../financing/FinanceCosts';
import {DollarSpan} from '../shared/DollarSpan';
import {PercentableInput} from '../shared/PercentableInput';
import {MinLimitedNumericInput, MinMaxLimitedNumericInput} from '../shared/MaskedNumericInput';
import {OverrideableCheckboxControl} from '../shared/OverrideableCheckboxControl';
import {EffectiveGrossIncome} from '../egi/EffectiveGrossIncome';
import incomes from '../Reducers';
import * as actions from '../Actions';
import {Project} from '../views/Project';
import {Financing} from '../views/Financing';
import {OperatingIncome} from '../views/OperatingIncome';

const initialState = {
  apartmentIncomes: [],
  parkingIncomes: [],
  otherIncomes: [],
  commercialIncomes: [],
  commercialParkingIncomes: [],
  max_residential_occupancy_percent: 95,
  max_commercial_occupancy_percent: 80
};

const otherIncomeCSS = {
  newIncomeContainerName: 'new-other-income',
  usageInputName: 'other-residential-use usage',
  squareFeetInputName: 'other-residential-square-feet',
  monthlyRentInputName: 'other-residential-monthly-rent',
  incomeSourceContainerName: 'other-residential-income',
  caption: 'other residential income'
};

const commercialIncomeCSS = {
  newIncomeContainerName: 'new-commercial-income',
  usageInputName: 'commercial-use usage',
  squareFeetInputName: 'commercial-square-feet',
  monthlyRentInputName: 'commercial-monthly-rent',
  incomeSourceContainerName: 'commercial-income',
  caption: 'commercial income'
};

const commercialParkingIncomeCSS = {
  newIncomeContainerName: 'new-commercial-parking-income',
  spacesInputName: 'commercial-parking-spaces',
  totalSquareFeetInputName: 'commercial-parking-square-feet',
  monthlyFeeInputName: 'commercial-parking-monthly-fee',
  indoorOrOutdoorInputName: 'commercial-parking-type',
  incomeSourceContainerName: 'commercial-parking-income'
};

const parkingIncomeCSS = {
  newIncomeContainerName: 'new-residential-parking-income',
  spacesInputName: 'residential-parking-spaces',
  totalSquareFeetInputName: 'residential-parking-square-feet',
  monthlyFeeInputName: 'residential-parking-monthly-fee',
  indoorOrOutdoorInputName: 'residential-parking-type',
  incomeSourceContainerName: 'residential-parking-income'
};

export class App extends React.Component<any, any> {

  constructor(props: any){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {...initialState, ...this.getDataFromStore2()};
  }

	private updateIncomes(incomeName: string, actionEffect: any){
    const updatedIncomes = incomes(this.state[incomeName], actionEffect);
		this.persist2(incomeName, updatedIncomes)
	}

	private persist2(dataName: string, data: any){
		console.log('persist2', dataName, data);
		this.setState(prevState => ({...prevState, [dataName]: data}));
	} 

	componentWillUpdate(nextProps, nextState) {
		if (this.state !== nextState){
			const stringifiedData = JSON.stringify(nextState);
			localStorage.setItem('sizemymultifamilyloan', stringifiedData);
		}
	}

	private getDataFromStore2(){
		const store = localStorage.getItem('sizemymultifamilyloan');
    const data = (store && JSON.parse(store)) || {};
		return data;
	}
	
	private nsPrepender(store: string){
		return `sizemymultifamilyloan.com_${store}`;
	}


  onChange(data: any){
    console.log("App#onChange", data)
    this.setState(prevState => ( {...prevState, ...data} ));
  }

  private totalGrossResidential(){
    const {parkingIncomes, apartmentIncomes, otherIncomes} = this.state;
    return [...parkingIncomes, ...apartmentIncomes, ...otherIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
      total + income,
      0
    );
  }

  private totalGrossCommercial(){
    const commercialIncomes = this.state.commercialIncomes || [];
    const commercialParkingIncomes = this.state.commercialParkingIncomes || [];
    return [...commercialIncomes, ...commercialParkingIncomes].map(inc => inc.totalMonthlyIncome).reduce((total, income) =>
      total + income,
      0
    );
  }

  private commercialEGI(gross: number){
    return this.egiHelper(gross, 'commercial_occupancy_percent');
  }

  private residentialEGI(gross: number){
    return this.egiHelper(gross, 'residential_occupancy_percent');
  }

  private egiHelper(gross: number, member: string){
    const egi = gross * this.state[member]/100.0;
    return isNaN(egi) ? 0 : egi;
  }

  private noi(totalEGI: number){
    if (totalEGI === 0){
      return 0;
    }
    if (this.state.operating_expenses_is_percent_of_effective_gross_income){
      const noi1 = this.state.operating_expenses/100.0 * totalEGI;
      return isNaN(noi1) ? 0 : noi1;
    } else{
      const noi2 = totalEGI - this.state.operating_expenses;
      return isNaN(noi2) ? 0 : noi2;
    }
  }

  render(){
    console.log('App#render', this.state);
    const totalGrossResidential = this.totalGrossResidential();
    const totalGrossCommercial = this.totalGrossCommercial();
    const commercialEGI = this.commercialEGI(totalGrossCommercial);
    const residentialEGI = this.residentialEGI(totalGrossResidential);
    const noi = this.noi(commercialEGI + residentialEGI);

    const project = Project({...this.state, onChange: this.onChange});
    const financing = Financing({...this.state, onChange: this.onChange});
    const opIncProps = {
      commercialEGI: commercialEGI,
      residentialEGI: residentialEGI,
      totalGrossResidential: totalGrossResidential,
      totalGrossCommercial: totalGrossCommercial
    };
    const operatingIncome = OperatingIncome({...this.state, ...opIncProps, onChange: this.onChange});
    const parking = (collection: any, collectionName: string, css: any) => {
      return (<ParkingIncome
       incomes={collection}
       onDestroy={id => this.updateIncomes(collectionName, actions.deleteIncome(id))}
       onSave={dta => this.updateIncomes(collectionName, actions.addIncome(dta))}
       css={css}
       />);
    };
    const other = (collection: any, collectionName: string, css: any) => {
      return ( <OtherIncome
       incomes={collection}
       onDestroy={id => this.updateIncomes(collectionName, actions.deleteIncome(id))}
       onSave={dta => this.updateIncomes(collectionName, actions.addIncome(dta))}
       css={css}
       />);
    };

    return (
        <div className='column'>
          <div id='inner_page_title'> 
            <h1>FHA Sec. 223(f) refinance/purchase demo</h1>
          </div>
          <div id='todoapp'>
            <div className='content'>
              <div id='income'>
          <ApartmentIncome
             incomes={this.state.apartmentIncomes}
             onDestroy={id => this.updateIncomes('apartmentIncomes', actions.deleteIncome(id))}
             onSave={dta => this.updateIncomes('apartmentIncomes', actions.addIncome(dta))}
             />
           residential parking
           {parking(this.state.parkingIncomes, 'parkingIncomes', parkingIncomeCSS)}
           commercial parking
           {parking(this.state.commercialParkingIncomes, 'commercialParkingIncomes', commercialParkingIncomeCSS)}
           commercial income
           {other(this.state.commercialIncomes, 'commercialIncomes', commercialIncomeCSS)}
           other income
           {other(this.state.otherIncomes, 'otherIncomes', otherIncomeCSS)}
           {operatingIncome}           
          <div id='operating-expense'>
            <div className='left'>
              <label htmlFor='total'>total operating expenses<span className='required'>*</span></label>
            </div>
            <div className='right'>
              <SharedInput2 onChange={this.onChange} valKey='operating_expenses'> 
                <PercentableInput id='total' value={this.state.operating_expenses} isPercent={this.state.operating_expenses_is_percent_of_effective_gross_income}>
                  <MinLimitedNumericInput id='total' min={0} />
                </PercentableInput>
              </SharedInput2 >
              <SharedInput2 onChange={this.onChange} valKey='operating_expenses_is_percent_of_effective_gross_income'> 
                <OverrideableCheckboxControl id='totalOperatingExpenseIsPercent' value={this.state.operating_expenses_is_percent_of_effective_gross_income}/>
              </SharedInput2>
              <label htmlFor='totalOperatingExpenseIsPercent'>%</label>
            </div>
          </div>
          <div id='operating'>
            <div className='left'>
              net operating income
            </div>
            <div className='right'>
              <DollarSpan value={noi} id='net-operating-income' />
            </div>
          </div>
          {project}
          </div>
          <div id='acquisition-costs'>
            {financing}
          </div>
        </div>
      </div>
    </div>
    );
  }
}

