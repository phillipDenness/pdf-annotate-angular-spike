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
    this.scriptService.load('pdfviewer', 'pdfjs', 'indexjs').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  ngOnInit() {

  }
}



