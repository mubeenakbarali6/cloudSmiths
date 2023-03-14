import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import processInformation from '@salesforce/apex/IdentitiyInformationController.processIdentityInformation';

export default class LightningExampleInputSearch extends LightningElement {

    queryTerm;
    year;
    isValid = false;
    isDisabled = true;

    handleKeyUp(evt) {
        this.isValid = false;
        this.queryTerm = evt.target.value;
        if (this.validateSearchTerm()) {
            this.isDisabled = false;
        } else if (this.queryTerm.length == 13) {

            this.dispatchEvent(new ShowToastEvent({
                title: 'Invalid Id',
                variant: 'error',
                message:
                    'The ID eneterd is invalid.',
            }));
        }
    }

    handleClick(evt) {
        this.year = '19' + this.queryTerm.substring(0, 2);
        this.isValid = true;
        this.isDisabled = true;
        processInformation({ southAfricaId: this.queryTerm })
            .then(result => {
            })
            .catch(error => {
            });
    }

    validateSearchTerm() {
        return this.queryTerm.length == 13 && isNaN(this.queryTerm) == false && this.checkSum();
    }

    checkSum() {
        //reference https://medium.com/@sahasuraj420/know-how-to-decode-sa-id-number-before-becoming-south-african-citizen-8cc60bcf6566 
        var arr = this.queryTerm.split('');     //we have converted the string into array
        var sum = 0;    // This variable will consists of sum after step 3
        var n = arr.length;
        for (var i = 0; i < n; i++) {
            arr[i] = parseInt(arr[i]);  // converting from character to int
        }
        for (var i = 1; i < n; i = i + 2) {   // execution of step 1
            var v = arr[n - 1 - i] * 2;
            if (v > 9) { arr[n - 1 - i] = v - 9; }
            else { arr[n - 1 - i] = v; }
        }
        for (var i = 0; i < n; i++) {    //calculating the step
            sum = sum + arr[i];
        }
        return sum % 10 === 0;
    }
}