import { Component, OnInit, AfterViewInit, ElementRef, Inject} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PDFAnnotations, PDFAnnotationData } from 'pdfjs-dist';
import * as PDFANNO from 'assets/pdf-annotate';


@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  data: PDFAnnotationData;
  
  constructor(pDFAnnotations:PDFAnnotations) { 
    this.data = pDFAnnotations.getData();
  }

  ngOnInit() {
    
  }
}



