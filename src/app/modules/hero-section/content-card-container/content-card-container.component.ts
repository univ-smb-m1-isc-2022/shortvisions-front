import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-content-card-container',
  templateUrl: './content-card-container.component.html',
  styleUrls: ['./content-card-container.component.scss']
})
export class ContentCardContainerComponent implements OnInit {

  cardsContent!:{
    head: string,
    body: string,
    button?: string[],
    footer?: string,

  }[];

  constructor() { }

  ngOnInit(): void {
    this.cardsContent = [
      {
        head: 'ShortVision!',
        body: "It's an app that uses AI to create a short format video that you can post on Youtube/Instagram/TikTok",
        button: ['Learn More',"Request a Demo"],
      },
      {
        head: 'News',
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vitae ultricies lacinia, nisl nisl aliquam nisl.",
        button: ['Read More!'],
        footer: 'Made by Yusscode'
      },

    ];
  }
}


