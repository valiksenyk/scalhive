import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommunicationService, IRepo} from '../services/communication.service';
import {APP_CONFIG, IAppConfig} from '../app.config';

export interface IContributor {
  id: string;
  login: string;
  avatar_url: string;
  contributions: number;
}

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.scss']
})
export class RepoComponent implements OnInit {

  name: string;
  repo: IRepo;
  contributors: Array<IContributor> = [];
  loader: boolean;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  page = 1;

  constructor(@Inject(APP_CONFIG) private _config: IAppConfig,
              private _route: ActivatedRoute,
              private _communicationService: CommunicationService) {
  }

  ngOnInit() {
    this.loader = true;
    this.name = this._route.snapshot.paramMap.get('name');
    this._communicationService.getRepo(this.name)
      .subscribe((res: IRepo) => {
        this.repo = res;
        this.loader = false;
      });

    this._communicationService.getRepoContributors(this.name)
      .subscribe((res: Array<IContributor>) => {
        this.contributors = res;
      });
  }

  loadMoreContributors() {
    this.page++;
    this._communicationService.getRepoContributors(this.name, this.page)
      .subscribe((res: Array<IContributor>) => {
        this.contributors = this.contributors.concat(res);
      });
  }

}
