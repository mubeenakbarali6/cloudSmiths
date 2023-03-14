import { LightningElement,api } from 'lwc';

export default class SearchResultsLwc extends LightningElement {
    @api result;
    resultdata;
    connectedCallback() {
        console.log('result', this.result);
        this.resultdata = this.result;
    }
}