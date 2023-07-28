import { FormControl } from '@angular/forms';

export type signupForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};
