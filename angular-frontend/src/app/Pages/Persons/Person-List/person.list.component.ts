import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { Person } from 'src/app/Models/person.model';
import { PersonApiService } from 'src/app/Services/person.service';
import { FeedBack } from 'src/app/Models/feedback';

@Component({
    selector: 'app-root',
    templateUrl: './person.list.component.html',
})
export class PersonListComponent implements OnInit {

    people: Person[] = [];
    feedback = new FeedBack("", "");
    isLoading: boolean = true;

    constructor(
        private personService: PersonApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getPeople();

        this.feedback = { feedbackType: '', feedbackmsg: '' };

        localStorage.removeItem('personId');
    }

    getPeople(): void {
        this.people = [];
        this.personService.getPeople().subscribe({
            next: (data: Person[]) => {
                if (data.length !== 0) {
                    this.people = data;
                };

            },
            error: (err: any) => {
                this.isLoading = false;
                console.log(err);
                this.feedback = {
                    feedbackType: err.feedbackType,
                    feedbackmsg: err.feedbackmsg,
                };
                console.log(JSON.stringify(this.feedback));
                throw new Error();
            },
            complete: () => {
                this.isLoading = true;
                this.feedback = { feedbackType: 'success', feedbackmsg: 'loaded' };
            },
        });
    }

    deletePerson(id: string, index) {

        if (window.confirm("Are you sure you want to delete this product?")) {
            this.personService.deletePerson(id).subscribe({
                next: (data) => {
                    this.people.splice(index, 1);
                },
                error: (err: any) => {
                    this.isLoading = false;
                    console.log(err);
                    this.feedback = {
                        feedbackType: err.feedbackType,
                        feedbackmsg: err.feedbackmsg,
                    };
                    throw new Error();
                }
            });
        }
    }

    saveDataAndNavigate(id: string) {
        localStorage.setItem('personId', id);
        this.router.navigate(['/personedit/']);
    }
}