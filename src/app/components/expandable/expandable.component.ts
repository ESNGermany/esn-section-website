import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'esn-expandable',
  templateUrl: 'expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ height: '*', visibility: 'visible' })),
      state('closed', style({ height: '0px', visibility: 'hidden' })),
      transition('* <=> *', [animate('225ms cubic-bezier(0.4,0.0,0.2,1)')]),
    ]),
    trigger('indicatorRotate', [
      state('closed', style({ transform: 'rotate(0deg)' })),
      state('open', style({ transform: 'rotate(180deg)' })),
      transition('* <=> *', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe],
})
export class ExpandableComponent {
  public state$ = new BehaviorSubject('closed');

  public toggleState(): void {
    if (this.state$.value === 'closed') {
      this.state$.next('open');
    } else {
      this.state$.next('closed');
    }
  }
}
