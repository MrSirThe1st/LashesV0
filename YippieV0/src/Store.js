import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({
  UserName: "",
  email: "",
  cellphoneNumber: "",
  password: "",
  confirmPassword: "",
  overview:"",
  country: null,
  city: null,
  category:null,
  brief:"",
  address:""
});

registerInDevtools({
  WizardStore,
});