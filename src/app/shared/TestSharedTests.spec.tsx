import {MaskedNumericInput, MinMaxLimitedNumericInput} from './MaskedNumericInput';
//import {minTests, maxTests, commonNumericInputTests} from './SpecialNumericInput.spec';
import {minTests, maxTests, commonNumericInputTests} from './SpecialNumericInput';
//import {maxTests} from './MaxNumericInputTests';

minTests(MaskedNumericInput, 40, 23.5);
commonNumericInputTests(MaskedNumericInput, 40, 23.5);

minTests(MinMaxLimitedNumericInput, 40, 23.5, 100);
maxTests(MinMaxLimitedNumericInput, 40, 23.5, 100);
commonNumericInputTests(MinMaxLimitedNumericInput, 40, 23.5, 100);
