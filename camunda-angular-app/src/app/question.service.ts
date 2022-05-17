import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { of } from 'rxjs';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  getQuestions(data) {
    const questions: QuestionBase<string>[] = [];
    for(let e in data) {
      console.log(data[e]);
      if(data[e].type != 'Null') {
        if(e=='niveau') {
          console.log(e)
          questions.push(new DropdownQuestion({
            key: e,
            label: e,
            value: data[e].value,
            options: [{ key: "Licence", value: "Licence" },
            { key: "Ingenierie", value: "Ingenierie" },
            { key: "Master", value: "Master" }]
          }));
          console.dir(new DropdownQuestion({
            key: e,
            label: e,
            value: data[e].value
          }));
        }
        else {
          questions.push(new TextboxQuestion({
            key: e,
            label: e,
            value: data[e].value
          }));
        }
      }

    }
    
    /*
    const questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
      })
    ];*/

    return of(questions.sort((a, b) => a.order - b.order));
  }
}


