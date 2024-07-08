import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PersonApiService } from 'src/app/Services/person.service';
import { FeedBack } from 'src/app/Models/feedback';

@Component({
    templateUrl: './person.create.component.html',
})

export class PersonCreateComponent implements OnInit {

    feedback = new FeedBack("", "");
    addForm: FormGroup;
    isLoading: boolean = true;


    constructor(
        private personService: PersonApiService,
        private fb: FormBuilder,
        private actRoute: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit() {

        localStorage.removeItem('personId');

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        this.addForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10),
            Validators.pattern("^[a-zA-Z]+$")]],
            email: ['', [Validators.required, Validators.email]]

        });
    }

    onSubmit() {
        if (window.confirm("Are you sure you want to create this new person?")) {
            this.personService.addPerson(this.addForm.value).subscribe({
                next: (data) => {
                    this.feedback = { feedbackType: 'success', feedbackmsg: 'Person created successfully' };
                    setTimeout(() => this.router.navigate(['/listperson']), 4000); // Navigate to the list or some other view
                },
                error: (err: any) => {
                    console.log(err);
                    this.isLoading = false;
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                },
                complete: () => {
                    this.isLoading = true;
                },
            });
        } else { }
    }

    get firstname() {
        return this.addForm.get('firstname');
    }

    get email() {
        return this.addForm.get('email');
    }

    get lastname() {
        return this.addForm.get('lastname');
    }
}
