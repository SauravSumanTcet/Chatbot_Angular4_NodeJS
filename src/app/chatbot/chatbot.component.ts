import { Component, OnInit, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { ChatbotService } from './chatbot.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
  animations: [
    // Define animations here.
    trigger('myAwesomeAnimation', [
      transition('small <=> large', animate('500ms ease-out', keyframes([
        style({ opacity: 0, transform: 'rotate(90deg)', offset: 0 }),
        style({ opacity: 0.5, transform: 'rotate(180deg)', offset: 0.5 }),
        style({ opacity: 1, transform: 'rotate(360deg)', offset: 1 })
      ]))),
    ]),
    trigger('fade', [
      state('in',
        style({ 'opacity': '1', 'visibility': 'visible', transform: 'translateY(0)' }),
      ),
      state('out',
        style({ 'opacity': '0', 'visibility': 'hidden', transform: 'translateY(130%)' })
      ),
      transition('* => *', animate('100ms'))
    ]),
  ]
})
export class ChatbotComponent implements OnInit,AfterViewChecked {
  private state: [string];
  private fade: string;
  private openIcon = { 'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAYAAADo6zjiAAAAAXNSR0IArs4c6QAAAr5JREFUWAntVz2MEkEUluXnTuGQwxAwV2ihMRcLicTSaywwdhZezsbKmtrKikQajN0lhsLC2JlcYujBGEJBIZ5iAwnEkJCYEORfWBa/b8Pc7S23d7kTttqXPObtvDfv++bN7DJju3Aotpkp2kPPYq3pLJ1o1UeCSv1+f1tRlO/T6VSGLlpk5N4HxhNiQQ8mqoJ3Op3tRSMa5QPWERIk4JxMJvtGAxbdD6xvxGQV1NnzASBdtA6oGSLbbDYPgMZcCwpbs8CJRywVWxA42BD0miQqpiBgEuY8jEXAqoBVAasCVgWsChhWQJblOs4I8vzfx9l7cABpGI06lsB4PC47nc576XT64Wg0+mE0+LR+5KkVCoWnDofjLuyKUTxJXNIeu8D4TyaTuY9+XygUCpRKpec4TH5mRbRxBrYyHA4L5XI5FolEriLHejab3WJObTwxoWoB5gjMAv92u93k7u7uBgIvQ6/EYrGbxWLxWb1ef9VsNt+32+096CfYHxqNxmsSTSQStxkL9aVSqWvI8Qb5Rlpw2vCfSkAdg6N0ezAYvK1UKg/C4bAPA0mGrV+n6/RFo1F/tVp9hDHvMLanBxbPiFUJiEPpKhw9dJ4oiGmhlF+xQX9Cf8PuYIAdsoZ1DkE3Yd/BgdN9YiI4ZzFDQWAFyX5JksTSmSKCgHgLpr1eb88UZB0ICXBDKPF4/CV27xedf+mPXAKxDC7Yq/l8fisYDN5Cic5zT7B7vd5Nt9sdcblcN5BPVHhuImIJBAEGMJjXJXFpoO+sIiYjJZPJjR1IIBDYwUftuj6RICD6BRGSIAESOY+yiivQi1BevXwejyeQy+Uet1qtj3gtB/rXEDFHRBD5n5aTEBMhIZJZg/r5IavVai/weefllP0SgZYh2ryCkCBlB6ACHUFlbeAyiDCnwGBLJREKSSjCqfYs+edYrH/16LJPC4LGtQAAAABJRU5ErkJggg==)' };
  private closeIcon = { 'background-image': 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOBAMAAADtZjDiAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAG1BMVEUAAAD///////////////////////////8AAADr8xjQAAAAB3RSTlMAM7cPx7jIAE21/gAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAABESURBVAjXYxAyYGBgYFZkUHcG0ialDCYlBgzM7slA7MxgUgaUNCkzdgfJMbunlIDUMpiUg7hwGiYOVQfTBzMHZi7UHgCB3RAZ7HszogAAAABJRU5ErkJggg==)' };


  private chatbot: Chatbot = {
    id: 1
    , msgToSend: 'Hey'
  };

  private messages: any = [
    {
      status: 'bot'
      , msg: 'Hi there!!! I am your personal Chatbot. Seem UI is 50% up to the mark. My developer is really a newbie in this field, Do send him your thoughts on it.'
    }
    , {
      status: 'sender'
      , msg: 'Hello'
    }
  ]


  constructor(private chatbotService: ChatbotService) {
    this.state = ['small'];
    this.fade = 'out';
  }

  ngOnInit() {
    this.scrollToBottom();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private animateMe(x) {
    this.state[x] = (this.state[x] === 'small' ? 'large' : 'small');
    this.toggleFade();
  }
  private toggleFade() {
    if (this.fade === 'out' || this.fade === undefined) {
      this.fade = 'in';
    } else {
      this.fade = 'out'
    }
  }
  keyDownFunction(event, msgToSend) {
    if (event.keyCode == 13) {
      console.log('you just clicked enter', msgToSend.chatbot.msgToSend);
      // rest of your code
      var x = {
        status: 'sender'
        , msg: msgToSend.chatbot.msgToSend
      };
      this.messages.push(x);
      this.scrollToBottom();
    }
  }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight + 1;
    } catch (err) { }
  }
}
export class Chatbot {
  id: number;
  msgToSend: string;
}
