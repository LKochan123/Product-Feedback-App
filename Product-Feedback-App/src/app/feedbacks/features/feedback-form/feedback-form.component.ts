import { Component, OnInit, Inject } from '@angular/core';
import { Validators, NonNullableFormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { tap } from 'rxjs/operators';
import { CategorySelectOption, CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusEnum, StatusSelectOption } from 'src/app/shared/models/enums/status';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { FeedbackForm } from './feedback-form.type';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  //Formularz nie byl otypowany. Stworzylem typ w folderze i dodalem tutaj.
  //Poza tym dla latwosci czytania mozesz stworzyc metode prywatna createForm(), ktora zwraca nam formularz.
  //Nastepnie przypisac ja do tego pola.
  feedbackForm = new FormGroup<FeedbackForm>({
    title: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(30), Validators.pattern(/\S/)],
      nonNullable: true,
    }),
    category: new FormControl(CategoryTagEnum.FEATURE, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    status: new FormControl(StatusEnum.SUGGESTION, { nonNullable: true }),
    detail: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)],
      nonNullable: true,
    }),
  });

  statusOptions: StatusSelectOption<StatusEnum>[] = [
    { label: 'Suggestion', value: StatusEnum.SUGGESTION },
    { label: 'Planned', value: StatusEnum.PLANNED },
    { label: 'In-Progress', value: StatusEnum.IN_PROGRESS },
    { label: 'Live', value: StatusEnum.LIVE },
  ];

  categoryOptions: CategorySelectOption<CategoryTagEnum>[] = [
    { label: 'Bug', value: CategoryTagEnum.BUG },
    { label: 'Enhancment', value: CategoryTagEnum.ENHANCEMENT },
    { label: 'Feature', value: CategoryTagEnum.FEATURE },
    { label: 'UI', value: CategoryTagEnum.UI },
    { label: 'UX', value: CategoryTagEnum.UX },
  ];

  headingName!: string;
  isSubmitted = false;
  errorTitleText = '';
  errorDetailText = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string | null;
    },
    private feedbackServcie: FeedbackService,
    private router: Router,
    private fb: NonNullableFormBuilder //polecam ustawic w lincie, zeby dawalo ci warning na nieuzywane pola prywatne
  ) {}

  ngOnInit() {
    if (this.data.id) {
      //tak jak juz wczesniej rozmawialismy - nie trzymajmy logiki w subscribe - wszystko do tapow.
      this.feedbackServcie.getFeedbackById$(this.data.id).subscribe(res => {
        this.headingName = `Editing "${res.feedback.title}"`;
        this.setFeedbackFormValues(res.feedback);
      });
    }
  }

  // po dodaniu feedbacku nie refreszuje sie lista z feedbackami
  // pojawia sie toast z napisale, ze sie udalo, a feedbacku nie ma :D
  onSubmit() {
    if (this.feedbackForm.valid) {
      if (this.data.id) {
        this.feedbackServcie.updateFeedback(this.data.id, this.feedbackForm.value);
      } else {
        this.feedbackServcie.addFeedback(this.feedbackForm.value);
      }
    } else {
      this.errorTitleText = this.getErrorMessage('title');
      this.errorDetailText = this.getErrorMessage('detail');
    }
    this.isSubmitted = true;
  }

  onDelete(id: string | null) {
    if (id) {
      this.feedbackServcie
        .deleteFeedback$(id)
        .pipe(
          tap(() => {
            const { status } = this.feedbackForm.value;
            this.router.navigate(status === StatusEnum.SUGGESTION ? ['/'] : ['/roadmap']);
            this.feedbackServcie.openPopup('Feedback deleted!');
          })
        )
        .subscribe();
    }
  }

  private setFeedbackFormValues(feedback: Feedback) {
    const { title, category, status, description } = feedback;
    this.feedbackForm.setValue({
      title: title,
      category: category,
      status: status,
      detail: description,
    });
  }

  // Powiem szczerze, ze ja nie jestem fanem takiego rozwiazania i chociaz nie jest glupie, czy jednoznacznie zle, to nie widzialem nigdy
  // w komercyjnym kodzie, zeby byly obslugiwane bledy w ten sposob
  // Zazwyczaj to hasError wrzuca sie w templatke po prostu. W powazniejszych projektach robi sie dyrketywe do obslugiwania bledow.
  // Mozna tez sobie poradzic pipem pewnie.
  // Zrefaktorowalem dla kontrolki title.
  // Moj sposob ma na pewno taki plusik, ze nie potrzebujemy pola isSubmitted.
  private getErrorMessage(controlName: string) {
    const control = this.feedbackForm.get(controlName);
    if (control) {
      const maxLength = `${control.errors?.['maxlength']?.requiredLength}`;
      const capitalizedControlName =
        controlName.substring(0, 1).toUpperCase() + controlName.substring(1);
      switch (true) {
        case control.hasError('required'):
          return `${capitalizedControlName} is required.`;
        case control.hasError('maxlength'):
          return `${capitalizedControlName} should not exceed ${maxLength} characters.`;
        case control.hasError('pattern'):
          return `${capitalizedControlName} should contain at least one non-space character.`;
        default:
          return '';
      }
    }
    return '';
  }
}
