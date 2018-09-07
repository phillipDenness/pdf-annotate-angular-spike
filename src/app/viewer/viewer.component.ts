import { Component, OnInit, AfterViewInit, ElementRef, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // ngAfterViewInit()
  // {
  //   const s = this.document.createElement('script');
  //   s.type = 'text/javascript';
  //   s.src = '//mozilla.github.io/pdf.js/build/pdf.js';
  //   const g = this.document.createElement('script');
  //   g.type = 'text/javascript';
  //   g.src = '/assets/pdf-annotate.js';

  //   const t = this.document.createElement('script');
  //   t.type = 'text/javascript';
  //   t.src = '/assets/demo.js';


  //   const __this = this; //to store the current instance to call 
  //                        //afterScriptAdded function on onload event of 
  //                        //script.
  //   s.onload = function () { __this.afterScriptAdded(); };
  //   // this.elementRef.nativeElement.appendChild(s);
  //   // this.elementRef.nativeElement.appendChild(g);
  //    this.elementRef.nativeElement.appendChild(t);
  // }

  // afterScriptAdded() {
  //   const RENDER_OPTIONS = {
  //     documentId: '/assets/example.pdf',
  //     pdfDocument: null,
  //     scale: 1,
  //     rotate: 0
  //   };
  //   if (typeof (window['functionFromExternalScript']) === 'function') {
  //     window['functionFromExternalScript'](RENDER_OPTIONS);
  //   }
  // }
//   <script src="src/assets/pdf.js"></script>
// <script src="src/assets/pdf_viewer.js"></script>
// <script src="src/assets/index.js"></script>
}



