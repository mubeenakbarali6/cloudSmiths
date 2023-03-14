import { LightningElement, api } from 'lwc';
import getHolidays from '@salesforce/apex/holidaysContainerController.getHolidays';


export default class HolidaysContainer extends LightningElement {
    @api year;

    holidays;
    error;
    connectedCallback() {
        console.log('connectedCallback '+this.year );
        getHolidays({ year: this.year })
            .then(result => {
                
                console.log('result', result);
                this.holidays = result;
            })
            .catch(error => {
                this.error = error;
            })
    }
}