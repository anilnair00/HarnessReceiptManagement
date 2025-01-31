import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit {
  @Input() showHelp!: boolean;
  constructor() {}

  ngOnInit(): void {}
}
