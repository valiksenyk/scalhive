import {Component, OnInit} from '@angular/core';
import {CommunicationService, IRepo} from '../services/communication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Array<IRepo> = [];
  next: string;
  showError: boolean;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;

  constructor(private _communicationService: CommunicationService) {
    _communicationService.searchSubredditsSubject.subscribe(() => {
      this.next = null;
      this.list = [];
      this.getArticles();
    });
  }

  ngOnInit() {
    this.getArticles();
  }

  public getArticles() {
    this._communicationService.getRepos()
      .subscribe((response: Array<IRepo>) => {
        this.list = response;
        },
        error => {
          if (error.status === 404) {
            this.showError = true;
          }
        });
  }

  public loadMore() {
    this.getArticles();
  }

}
