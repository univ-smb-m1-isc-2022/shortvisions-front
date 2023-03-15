import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.scss']
})
export class ContentCardComponent implements OnInit {
  @Input() content!:{
    head: string,
    body: string,
    button?: string[],
    footer?: string,
  }
  ngOnInit(): void {

  }
  constructor() {
  }

}
