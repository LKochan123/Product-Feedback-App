import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { tap } from 'rxjs/operators';
import { CategoryTagEnum } from 'src/app/models/enums/category-tag';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  // Powiem szczerze, ze ja nie jestem fanem trzymania stylow w metadacie. Lubie jak w calym projekcie style sa trzymane w jeden okreslony sposob, a nie, ze tutaj w metadacie, a tu w pliku, bo to wplywa na to jak szybko poruszasz sie po projekcie jako nowy developer.
  // Natomaist jesli stwierdzimy, ze raczej wszedzie bedzie malo styli, to i tak moze sie zdarzyc jeden komponent z ich wieksza iloscia i trzymanie tego w metadacie bedzie po prostu nieczytelne.
  styles: [
    `
      .error {
        border: 0.5px solid tomato;
      }

      .select-arrow {
        border-right: 12px solid transparent;
      }
    `,
  ],
})
export class FeedbackFormComponent implements OnInit {
  categoryOptions = CategoryTagEnum;
  // Nie podoba mi sie to rozwiazanie. Ja bym zrobil z tego enum, a nastepnie stworzyl generyczny interfejs do opcji, ktory mialby taki ksztalt: interface SelectOption<T> {label: string; value: T} i stosowałbym go z selectami.
  //W tym wypadku byloby statusOptions: SelectOption<StatusOptionsEnum> = [{label: StatusOptionsEnum.SUGGESTION, value: StatusOptionsEnum.SUGGESTION}].
  //Dzięki temu mozemy oddzielic to co sie wyswietla jako opcja, od jej realnej wartosci. Nieocenione przy pracy z kilkoma wersjami jezykowymi.
  statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live'];
  // Nie rozumiem, co to jest fmode. Rozumiem, ze mamy tu flage dotyczaca tego, czy formularz jest w trybie edycji i id to id edytowanego wlasnie formularza, ale nie wiem co to fMode i to mylące.
  //Dodatkowo argumentowałbym, ze mozna byloby to uproscic. Nigdzie nie korzystasz z pola isEditingPost bo uznajesz, ze jesli jest id to jestesmy w edycji. I slusznie. Mozna zatem zmienic ten input.
  //Dodatkowo obiecujesz, ze te dane przyjda, a nie zabezpieczasz sie w selectorze w ten sposób: selector: 'app-feedback-form[fModel]',
  @Input() fMode!: { isEditingPost: boolean; id: string | null };
  feedbackForm!: FormGroup; // Formularz nie jest otypowany!
  //Obiecujesz, ze to pole zostanie zainicjalizowane, ale jesli nie jestesmy w edycji, to nie zostanie. Nie powinno się tak robić.
  headingName!: string;
  //jw
  isLoading!: boolean;
  isSubmitted = false;
  errorTitleText = '';
  errorDetailText = '';

  constructor(private productsServcie: ProductsService, private router: Router) {}

  ngOnInit() {
    this.createFeedbackForm();

    if (this.fMode.id) {
      this.isLoading = true;
      this.productsServcie.getPostById$(this.fMode.id).subscribe((res) => {
        const { title, category, status, description } = res.feedback;
        this.headingName = `Editing "${title}"`;
        this.feedbackForm.setValue({
          title: title,
          category: category.toUpperCase(),
          status: status,
          detail: description,
        });
        this.isLoading = false;
      });
    }
  }

  createFeedbackForm() {
    this.feedbackForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30), Validators.pattern(/\S/)],
      }),
      //Ta kontrolka powinna mieć za typ enuma
      category: new FormControl('FEATURE', {
        validators: [Validators.required],
      }),
      //j.w.
      status: new FormControl('Suggestion'),
      //to jest błąd po przez inferencje typujesz te kontrolkę jako null, a ona jest stringiem. Wartość początkowa powinna być pustym stringiem.
      detail: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)],
      }),
    });
  }

  onSubmit() {
    const { title, category, status, detail } = this.feedbackForm.value; //nie otypowales formularza i teraz wszystkie consty sa typu any. Nie powinno sie tak zdarzac.
    const enumCategory = CategoryTagEnum[category as keyof typeof CategoryTagEnum];

    if (this.feedbackForm.valid) {
      if (this.fMode.id) {
        this.productsServcie.updatePost(this.fMode.id, title?.trim(), enumCategory, status, detail?.trim());
      } else {
        this.productsServcie.addPost(title, enumCategory, detail);
      }
    } else {
      this.errorTitleText = this.getErrorMessage('title');
      this.errorDetailText = this.getErrorMessage('detail');
    }
    this.isSubmitted = true;
  }

  getErrorMessage(controlName: string) {
    const control = this.feedbackForm.get(controlName);
    if (control) {
      const maxLength = `${control.errors?.['maxlength']?.requiredLength}`;
      const capitalizedControlName = controlName.substring(0, 1).toUpperCase() + controlName.substring(1);
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

  onDelete(id: string | null) {
    if (id) {
      this.productsServcie
        .deletePost$(id)
        .pipe(
          tap(() => {
            const { status } = this.feedbackForm.value;
            this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
          })
        )
        .subscribe();
    }
  }
}
