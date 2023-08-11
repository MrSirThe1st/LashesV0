import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({
  UserName: "",
  termsAccepted: "",
  privacyAccepted: "",
  progress: 0,
  email: "",
  cellphoneNumber: "",
  password: "",
  confirmPassword: "",
  overview:"",
  country: null,
  city: null,
  state: null,
  item:null,
});

registerInDevtools({
  WizardStore,
});