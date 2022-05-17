import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CamundaRestService } from '../camunda-rest.service';
import { Task } from '../schemas/Task';
import { Observable } from 'rxjs';
import { QuestionBase } from '../question-base';
import { QuestionService } from '../question.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
  providers:  [QuestionService]
})
export class TasklistComponent implements OnInit {

  tasks$ : Observable<QuestionBase<any>[]> = null;
  tasks = [];
  taskId: String = null;
  formKey: String;
  form;
  questions$: Observable<QuestionBase<any>[]> = null;

  constructor(
    private camundaRestService: CamundaRestService,
    private route: ActivatedRoute,
    private router: Router,
    public service: QuestionService) {
      router.events.subscribe((val) => {
        this.form = null;
        this.questions$ = null;
    });
    
  }

  ngOnInit() {
    this.camundaRestService
      .getTasks()
      .subscribe(tasks => { this.tasks = tasks });
    if (this.route.params != null) {
      this.route.params.subscribe(params => {
        if (params['id'] != null) {
          this.taskId = params['id'];
          this.camundaRestService.getTaskForm(this.taskId).subscribe(
            data => { 
              this.form = data;
              this.questions$ = this.service.getQuestions(this.form);
            }
          );
        } 
      });

    }
    
  }

  getFormKey(): void {
    this.camundaRestService
      .getTaskFormKey(this.taskId)
      .subscribe(formKey => { 
        this.formKey = formKey.key });
  }



}
