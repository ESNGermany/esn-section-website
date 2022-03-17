import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-expandable',
  template: `
    <div
      class="cursor-pointer flex flex-row justify-between font-md font-body exp"
      (click)="toggleState()"
    >
      <ng-content select="[slot=header]"></ng-content>
      <img
        [@indicatorRotate]="state$ | async"
        src="assets/fonts/MaterialIcons/expand_more.png"
        width="24px"
      />
    </div>
    <div
      [@openClose]="state$ | async"
      class="overflow-hidden text-md font-body bgwhite"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .exp {
        min-height: 48px;
        align-items: center;
        padding: 0 24px;
      }
      .bgwhite {
        background: white;
      }
      .bgwhite:hover {
        background: white;
      }
    `,
  ],
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
})
export class ExpandableComponent {
  public state$ = new BehaviorSubject('closed');

  constructor() {}

  public toggleState(): void {
    if (this.state$.value === 'closed') {
      this.state$.next('open');
    } else {
      this.state$.next('closed');
    }
  }
}
