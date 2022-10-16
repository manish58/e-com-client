import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelView } from 'src/app/model/model-view';
import { User } from 'src/app/model/user.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  emailPattern: string = "[a-zA-Z0-9._+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,3}$";

  registerForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  })
  formSubmitted: boolean = false;
  errorMsg: string = "";
  constructor(private projectService: ProjectInitliazationService, private mvl: ModelView,
    private router: Router) { }

  ngOnInit(): void {
  }

  createNewUser() {
    this.formSubmitted = true;
    this.errorMsg = "";
    if (this.registerForm.get('password').value != this.registerForm.get('confirmPassword').value) {
      this.errorMsg = "Password does not match"
      //error msg
    } else {
      //api calling
      if (this.registerForm.valid)
        this.projectService.registerUser(this.registerForm.value).subscribe((res: User) => {
          localStorage.setItem("token", res.token);
          localStorage.setItem("cart", JSON.stringify(res.user.cart));
          localStorage.setItem("user", JSON.stringify(res.user));
          this.mvl.setCartItems();
          this.mvl.userData.next(res.user)
          // this.mvl.userData.next(res.user)
          this.router.navigate([''])
        })
    }
  }
}
