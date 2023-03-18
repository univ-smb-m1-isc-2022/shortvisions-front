import {
  trigger,
  transition,
  style,
  query,
  group,
  animateChild,
  animate,
  keyframes
} from '@angular/animations';

// basic fader animation
export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':enter', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)'
        })
      ], { optional: true }),
      query(':leave', [
        animate('300ms ease',
          style({ opacity: 0, transform: 'scale(0.5) translateY(35%)' }))
      ], { optional: true }),
      query(':enter', [
        animate('300ms ease',
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ], { optional: true })
    ])
  ]);
