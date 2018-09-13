import {Directive, Host, Input, Optional, Self} from '@angular/core';
import {Utils} from '../utils/utils';
import {isValidNumber} from 'libphonenumber-js';
import {InputFieldTextComponent} from '../widgets/input-field-text/input-field-text.component';

@Directive({
    selector: '[cbpValidator]'
})
export class ValidatorDirective {

    @Input() cbpValidator: any;

    constructor(@Host() @Self() @Optional() public inputText: InputFieldTextComponent) {
        inputText.modelChange.asObservable().debounceTime(700).subscribe(change => {
            this.checkStuff();
        });
    }

    private checkStuff() {
        switch (this.cbpValidator) {
            case 'email':
                this.checkEmail();
                break;
            case 'phone':
                this.checkPhone();
                break;
            case 'licence':
            this.validateLicence();
        }
    }

    private validateLicence() {
        if (this.inputText.model && this.inputText.model.length) {
            if (!Utils.validateLicence(this.inputText.model)) {
                this.inputText.error = true;
                this.inputText.errorMessage = 'Invalid Licence';
            } else {
                this.inputText.error = false;
                console.log("error is", this.inputText.error);
                this.inputText.errorMessage = '';
            }
        } else {
            this.inputText.error = false;
            console.log("error is", this.inputText.error);
            this.inputText.errorMessage = '';
        }
    }
    
    private checkEmail() {
        if (this.inputText.model && this.inputText.model.length) {
            if (!Utils.validateEmail(this.inputText.model)) {
                this.inputText.error = true;
                this.inputText.errorMessage = 'Invalid Email';
            } else {
                this.inputText.errorMessage = '';
            }
        } else {
            this.inputText.errorMessage = '';
        }
    }

    private checkPhone() {
        console.log('Phone is valid', isValidNumber(this.inputText.model));
        if (this.inputText.model && this.inputText.model.length) {
            if (!Utils.validatePhoneNumber(this.inputText.model)) {
                this.inputText.errorMessage = 'Invalid Phone Number';
            } else {
                this.inputText.errorMessage = '';
            }
        } else {
            this.inputText.errorMessage = '';
        }
    }


}
