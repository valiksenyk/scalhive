import {Component, OnInit} from '@angular/core';
import {CommunicationService, IRepo} from '../services/communication.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: Array<IRepo> = [];
  showError: boolean;

  constructor(private _communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.getRepos();
  }

  public getRepos() {
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
}
