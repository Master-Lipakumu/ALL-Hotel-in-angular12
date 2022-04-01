import { FormGroup } from "@angular/forms";


/*export class GlobalGenericValidator {
  constructor(
    private validatorMessages:{[key:string]:{[key:string]:string}}
  ){}
    public createErrorMessage(container:FormGroup):{[key:string]:string}{
      const errorMessages={};
      for(const controlName in container.controls){
        if(container.controls.hasOwnProperty(controlName)){
          const selectedcontrol = container.controls[controlName];
          if(this.validatorMessages[controlName]){
            errorMessages[controlName]='';
            if((selectedcontrol.dirty|| selectedcontrol.touched) && selectedcontrol.errors){
              Object.keys(selectedcontrol.errors).map((errorMessageKey:string)=>{
                if(this.validatorMessages[controlName][errorMessageKey]){
                  errorMessages[controlName]+= this.validatorMessages[controlName][errorMessageKey]+ ' ';
                   }
                   )
              }
              )
            }
          }
        }
    }
    return errorMessage;
  }
}*/

export class GenericValidator {
  // By default the defined set of validation messages is pass but a custom message when the class is called can also be passed
  constructor(private validationMessages: { [key: string]: { [key: string]: string } } = validationMessages) {}

  // this will process each formcontrol in the form group
  // and then return the error message to display
  // the return value will be in this format `formControlName: 'error message'`;
  public createErrorMessage(container: FormGroup, isFormSubmitted:boolean): { [key: string]: string } {
    const errorMessages = {};
    // loop through all the formControls
    for (const controlName in container.controls) {
      if (container.controls.hasOwnProperty(controlName)) {
        // get the properties of each formControl
        const selectedControl = container.controls[controlName];
        // If it is a FormGroup, process its child controls.
        if (selectedControl instanceof FormGroup) {
          const childMessages = this.createErrorMessage(selectedControl, isFormSubmitted);
          Object.assign(errorMessages, childMessages);
        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlName]) {
            errorMessages[controlName] = '';
            if ((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {
              // loop through the object of errors
              Object.keys(selectedControl.errors).map(errorMassageKey => {
                if (this.validationMessages[controlName][errorMassageKey]) {
                  errorMessages[controlName] += this.validationMessages[controlName][errorMassageKey] + ' ';
                }
              });
            }
          }
        }
      }
    }
    return errorMessages;
  }
}
