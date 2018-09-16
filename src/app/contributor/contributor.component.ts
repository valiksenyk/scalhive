import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommunicationService, IUser} from '../services/communication.service';

@Component({
  selector: 'app-contributor',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss']
})
export class ContributorComponent implements OnInit {
  name: string;
  contributor: IUser;
  loader: boolean;

  constructor(private _route: ActivatedRoute,
              private _communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.loader = true;
    this.name = this._route.snapshot.paramMap.get('name');
    this._communicationService.getUser(this.name)
      .subscribe((res: IUser) => {
        this.contributor = res;
        this.loader = false;
      });
  }

}
