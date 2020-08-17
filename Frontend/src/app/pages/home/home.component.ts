import { Component, OnInit, ViewChild} from '@angular/core';
import 'ace-builds/webpack-resolver';
import "brace/theme/pastel_on_dark";
import "brace/mode/html";
import "brace/mode/css";
import "brace/mode/javascript";
import { DomSanitizer } from '@angular/platform-browser';
declare function init_plugins();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor( private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    init_plugins()
  }

    options:any = {maxLines: 1000, printMargin: false};
    textHtml: string = "";
    textCss: string = "";
    textJs: string = "";


    onChangeHtml(code) {
      // code= this.sanitizer.bypassSecurityTrustHtml(code)
      this.textHtml=code
      console.log("HTML", this.textHtml);
    }
    onChangeCss(code) {
      this.textCss=code
      
      // code= this.sanitizer.bypassSecurityTrustStyle(code);
      console.log("CSS", code);
       
    }
    onChangeJs(code) {
      this.textJs=code
      
      // code= this.sanitizer.bypassSecurityTrustScript(code)
      console.log("JS", code);
    }
    
}
