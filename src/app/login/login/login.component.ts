import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { map } from 'rxjs/operators';
import { GlobalService } from 'src/app/service/global.service';
import { Router } from '@angular/router';
import { Observable, Subscribable, Subscription } from 'rxjs';
import { User } from 'src/app/interface/user';
import { Store } from '@ngrx/store';
import { addUserAction, addUserInfoAction } from 'src/app/store/user/user.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../sd-scss/globalCss.scss', './login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  submittingForm: Boolean = false;
  loginOption: Boolean = true;
  showSuccessMess = false;
  updateUser = false;

  user: User | null = null
  userSubscription: Subscription | undefined;



  registrationForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    number: new FormControl('')
  })

  loginForm = this.fb.group({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private fb: FormBuilder, private api: ApiService, private global: GlobalService, private router: Router, private store: Store<{ user: User }>) {
    this.userSubscription = this.global.user$.subscribe(res => {
      this.user = res.user
    })
  }

  get regForm() {
    return this.registrationForm.controls
  }

  get logForm() {
    return this.loginForm.controls
  }


  ngOnInit(): void {
    if (this.user?.sub) {
      this.updateUser = true;
      this.loginOption = false;
      this.api.getUser(this.user?.sub).subscribe(res => {
        this.registrationForm.patchValue({
          firstName: res.name.firstname,
          lastName: res.name.lastname,
          email: res.email,
          password: res.password,
          phone: res.phone,
          city: res.address.city,
          street: res.address.street,
          zipcode: res.address.zipcode,
          number: res.address.number
        })
      },
        (err) => {
          console.warn(err)
        })
    }
  }

  toggleLogin() {
    this.loginOption = !this.loginOption;
    this.showSuccessMess = false;
  }



  submitLoginForm() {
    this.loginForm.markAllAsTouched()
    this.submittingForm = true;
    if (this.loginForm.valid) {
      this.api.userLogin(this.loginForm.value.email, this.loginForm.value.password)
        .pipe(map(res => {
          this.global.setCookie('userToken', res.token, 30)
          return this.global.decodeToken(res.token)
        }
        ))
        .subscribe(res => {
          this.global.user = res
          this.store.dispatch(addUserAction({ user: res }))
          this.getUserInfo(res.sub)
          this.submittingForm = false;
          this.router.navigate(['/home'])
        },
          (err) => {
            console.warn(err);
            this.submittingForm = false;
          }
        )
    } else {
      this.submittingForm = false;
    }
  }

  getUserInfo(id: number) {
    this.api.getUser(id).subscribe(res => {
      this.store.dispatch(addUserInfoAction({ userInfo: res }))
    }, (err) => {
      console.warn(err)
    })
  }

  submitUserForm() {
    this.updateUser ? this.submitUpdateForm() : this.submitRegistrationForm()
  }

  submitUpdateForm() {
    this.registrationForm.markAllAsTouched();
    this.submittingForm = true;
    if (this.registrationForm.valid) {
      this.api.updateUser(
        this.registrationForm.value.firstName,
        this.registrationForm.value.lastName,
        this.registrationForm.value.email,
        this.registrationForm.value.phone,
        this.registrationForm.value.password,
        this.registrationForm.value.city,
        this.registrationForm.value.street,
        this.registrationForm.value.zipcode,
        this.registrationForm.value.number,
        this.global.user.sub
      ).subscribe(res => {
        this.submittingForm = false;
        this.updateUser = false;
        this.loginOption = true;
        this.router.navigate(['/dashboard'])
      },
        (err) => {
          console.warn(err)
          this.submittingForm = false
        })
    } else {
      this.submittingForm = false;
    }

  }
  submitRegistrationForm() {
    this.registrationForm.markAllAsTouched();
    this.submittingForm = true;
    if (this.registrationForm.valid) {
      this.api.registerUser(
        this.registrationForm.value.firstName,
        this.registrationForm.value.lastName,
        this.registrationForm.value.email,
        this.registrationForm.value.phone,
        this.registrationForm.value.password,
        this.registrationForm.value.city,
        this.registrationForm.value.street,
        this.registrationForm.value.zipcode,
        this.registrationForm.value.number
      ).subscribe(res => {
        this.showSuccessMess = true;
        this.submittingForm = false
      },
        (err) => {
          console.warn(err)
          this.submittingForm = false
        })
    } else {
      this.submittingForm = false;
    }

  }

  ngOnDestroy(): void {
    this.userSubscription ? this.userSubscription.unsubscribe() : ''
  }
}
