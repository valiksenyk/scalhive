import { Component, OnInit } from '@angular/core';
import {CommunicationService} from '../services/communication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCollapsed = true;
  model: string;

  constructor(private _communicationService: CommunicationService, private _router: Router) {}

  search() {
    this._communicationService.searchSubreddits(this.model);
    this._router.navigate(['list']);
  }
}
