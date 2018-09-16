import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {APP_CONFIG, IAppConfig} from '../app.config';
import {map} from 'rxjs/operators';

export interface IRepo {
  id: string;
  name: string;
  description: string;
  stars: string;
  owner: string;
  created: number;
  updated: number;
  link: string;
  image: string;
  watchers: number;
  forks: number;
}

export interface IUser {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  followers: number;
  public_repos: number;
  html_url: string;
}

@Injectable()
export class CommunicationService {
  repos: Array<IRepo> = [];

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private _config: IAppConfig) {
  }

  getRepos() {
    return this._http.get(`${this._config.apiEndpoint}users/${this._config.name}/repos`).pipe(
      map(response => {
        return this._parseResponse(response);
      }));
  }

  getRepoContributors(name, page?: number) {
    return this._http.get(`${this._config.apiEndpoint}repos/${this._config.name}/${name}/contributors?page=${page}`);
  }

  getRepo(name) {
    return this._http.get(`${this._config.apiEndpoint}repos/${this._config.name}/${name}`).pipe(
      map(response => {
        return this._createRepoObj(response);
      })
    );
  }

  getUser(name: string) {
    return this._http.get(`${this._config.apiEndpoint}users/${name}`);
  }

  private _parseResponse(response): Array<IRepo> {
    this.repos = [];
    for (const item of response) {
      this.repos.push(this._createRepoObj(item));
    }
    return this.repos;
  }

  private _createRepoObj(resObj): IRepo {
    return {
      id: resObj.id,
      name: resObj.name,
      description: resObj.description,
      stars: resObj.stargazers_count,
      owner: resObj.owner.login,
      created: resObj.created_at,
      updated: resObj.updated_at,
      link: resObj.html_url,
      image: resObj.owner.avatar_url,
      watchers: resObj.watchers,
      forks: resObj.forks
    };
  }
}
