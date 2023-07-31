import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({
  fullName: "",
  age: "",
  birthPlace: "",
  maidenName: "",
  termsAccepted: "",
  privacyAccepted: "",
  progress: 0,
});

registerInDevtools({
  WizardStore,
});