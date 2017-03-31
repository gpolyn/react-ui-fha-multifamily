import {MaskedNumericInput, MinMaxLimitedNumericInput, MinLimitedNumericInput} from './MaskedNumericInput';
import {minTests, maxTests, commonNumericInputTests} from './SpecialNumericInput';

const minProps = {value: 40, min: 23.5};
const maxProps = {...minProps, max: 100.25};

/*
minTests(MaskedNumericInput, minProps);
commonNumericInputTests(MaskedNumericInput, minProps);

minTests(MinLimitedNumericInput, minProps);
commonNumericInputTests(MinLimitedNumericInput, minProps);

minTests(MinMaxLimitedNumericInput, maxProps);
maxTests(MinMaxLimitedNumericInput, maxProps);
commonNumericInputTests(MinMaxLimitedNumericInput, maxProps);
*/
