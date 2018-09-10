import { Component, OnInit, Inject} from '@angular/core';
import { ScriptService } from '../script.service'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [ScriptService]
})
export class ViewerComponent implements OnInit {
  
  constructor(@Inject(ScriptService) private scriptService) {
    this.scriptService.load('pdfviewer', 'pdfjs')
    .then(data => {
      console.log('script loaded ', data)
    })
    .then(data => {
      this.scriptService.load('indexjs').then(data => {
        console.log('script loaded ', data)
      })
    })
    .catch(err => {
      err => console.log(err)
    });
  }

  ngOnInit() {
  }
}



