import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModelView } from 'src/app/model/model-view';
import { User } from 'src/app/model/user.model';
import { ProjectInitliazationService } from 'src/app/services/project-initliazation.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private projectService: ProjectInitliazationService,
    private mvl: ModelView, private router: Router) { }

  emailPattern: string = "[a-zA-Z0-9._+-]+@[A-Za-z0-9-]+\\.[A-Za-z]{2,3}$";

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', Validators.required)
  })
  formSubmitted: boolean = false;
  errorMsgEmail: string = "";

  ngOnInit(): void {
  }

  loginUser() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.projectService.loginUser(this.loginForm.value).subscribe((res: any) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("cart", JSON.stringify(res.user.cart));
        localStorage.setItem("user", JSON.stringify(res.user));
        this.mvl.userData.next(res.user)
        this.mvl.setCartItems();
        this.router.navigate([''])
      })
    }
  }
}
