import { Component, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {


  constructor(private elementRef: ElementRef) {

  }
  title = 'app';
  ngAfterViewChecked(): void {
    var existsScript = document.getElementById("customJS");
    if (existsScript != null) {
      this.elementRef.nativeElement.removeChild(existsScript);
    }
    else {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "../assets/js/custom.js";
      s.id = "customJS";
      this.elementRef.nativeElement.appendChild(s);
    }
  }
}
