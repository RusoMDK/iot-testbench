import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerService } from 'src/app/core/spinner/spinner.service';

@Component({
  selector: 'app-index-view',
  templateUrl: './index-view.component.html',
})
export class IndexViewComponent {

  constructor(
    private activatedRoute: ActivatedRoute,
    public loadingSpinner: LoadingSpinnerService,
  ) {}
}
