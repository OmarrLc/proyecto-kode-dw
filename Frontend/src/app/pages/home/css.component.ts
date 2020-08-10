import { Component, OnInit } from '@angular/core';
export interface CodeModel {
  language: string;
  value: string;
  uri: string;

  dependencies?: Array<string>;
  schemas?: Array<{
    uri: string;
    schema: Object;
  }>;
} 

@Component({
  selector: 'app-css',
  templateUrl: './css.component.html',
  styleUrls: ['./css.component.css']
})
export class CssComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  theme = 'vs-dark';
  lenguaje='css';
  codeModel: CodeModel = {
    language: this.lenguaje,
    uri: 'main.json',
    value: '',
    schemas: [
      {
        uri: 'http://custom/schema.json',
        schema: {
          type: 'object',
          properties: {
            type: {
              enum: ['button', 'textbox'],
            },
          },
        },
      },
    ],
  };
 
  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };


  // onCodeChanged(value) {
  //   console.log('CODE', value);
  // }

}
