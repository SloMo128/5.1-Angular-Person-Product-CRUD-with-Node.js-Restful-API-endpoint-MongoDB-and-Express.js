import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { PersonApiService } from 'src/app/Services/person.service';
import { Person } from 'src/app/Models/person.model';
import { FeedBack } from 'src/app/Models/feedback';

@Component({
    templateUrl: './person.edit.component.html',
})

export class PersonEditComponent implements OnInit {

    editForm: FormGroup;
    people: Person[] = []
    person = new Person("", "", "", "");
    feedback = new FeedBack("", "");
    data: string;
    isLoading: boolean = true;

    constructor(
        private personService: PersonApiService,
        private fb: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit() {

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.data = localStorage.getItem('personId');
        if (!this.data) {
            alert("Something wrong!");
            this.router.navigate(['']);
            return;
        }

        this.editForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            email: ['', [Validators.required, Validators.email]]

        });

        this.loadForm(this.data);
    }

    loadForm(id: string) {
        this.personService.getPerson(id).subscribe({
            next: (data: Person) => {
                this.editForm.setValue({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email
                })  
                // this.localStorageService.setItem('employees', this.editForm.value);
            },
            error: (err: any) => {
                console.log(err);
                this.isLoading = false;
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
              },
              complete: () => {},
        })
    }

    onSubmit() {
        this.personService.updatePerson(this.data , this.editForm.value).subscribe({
          next: (data) => {
            this.feedback = { feedbackType: 'success', feedbackmsg: 'Person updated successfully!' };
            setTimeout(() => this.router.navigate(['/person-list']), 4000);
    
            localStorage.removeItem('personId');
          },
          error: (err: any) => {
            console.log(err);
            this.isLoading = false;
            this.feedback = {
                feedbackType: err.feedbackType,
                feedbackmsg: err.feedbackmsg,
            };
          },
          complete: () => {
          },
        });
      }

    get firstname() {
        return this.editForm.get('firstname');
    }

    get email() {
        return this.editForm.get('email');
    }

    get lastname() {
        return this.editForm.get('lastname');
    }
}
