import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AuthInterface} from '../../interfaces/auth.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() { }

  onSubmit( value: AuthInterface ) {
    // console.log('%c [ REGISTER - Component ] value', 'color: lightblue', value );
    this.authService.createUser( value );
  }
}
