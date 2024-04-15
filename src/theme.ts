import { ELEMENT, Container, P, EM, Button, H2 } from "@javascriptui/core";
import '../assets/font/style.css';
import App, { SimpleTask } from "./app";

export default {
  globals: {
    '*': {
      padding: 0, margin: 0, outline: 0, boxSizing: 'border-box',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    ':root': {
      '--grey-09': '#f0f0f0',
      '--grey-08': '#e7e7e7',
      '--grey-07': '#e0e0e0',
      '--grey-06': '#c5c5c5',
      '--grey-05': '#a0a0a0',
      '--grey-03': '#505050',
      '--grey-02': '#3f3f3f',
      '--green-01': '#4DA958',
      '--orange-01': '#FB9905',
      '--red-01': '#c92400',
      '--blue-01': '#1C62C8',
      '--white-01': '#FFFFFF',
    },
    html: {
      backgroundColor: 'var(--white-01)'
    },
    body: {
      overflowX: 'hidden'
    },
    'body::-webkit-scrollbar': {
      width: 6
    },
    'body::-webkit-scrollbar-track': {
      backgroundColor: 'transparent'
    },
    'body::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(100, 100, 100, 0.8)',
      border: 'transparent',
    },
    '@media(prefers-color-scheme: dark)': `
      :root {
        --white-01: #202020;
        --grey-08: #303030;
        --grey-09: #171717;
        --grey-07: #505050;
        --grey-03: #d0d0d0;
        --grey-02: #f0f0f0;
      }
    `,
  },
  colors: {
    grey09: 'var(--grey-09)',
    grey08: 'var(--grey-08)',
    grey07: 'var(--grey-07)',
    grey06: 'var(--grey-06)',
    grey05: 'var(--grey-05)',
    grey03: 'var(--grey-03)',
    grey02: 'var(--grey-02)',
    green01: 'var(--green-01)',
    orange01: 'var(--orange-01)',
    red01: 'var(--red-01)',
    blue01: 'var(--blue-01)',
    white01: 'var(--white-01)'
  }
}

export const Ics = {
  appleLogo: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.0941 21.006C8.46533 20.9719 7.87364 20.6977 7.4411 20.24C6.9237 19.7422 6.46199 19.1897 6.0641 18.592C5.44259 17.702 4.95131 16.7279 4.6051 15.699C4.21297 14.5922 4.00652 13.4282 3.9941 12.254C3.96397 11.1019 4.24961 9.96346 4.8201 8.96202C5.23768 8.24012 5.83329 7.63728 6.5501 7.21102C7.25899 6.78659 8.06792 6.55813 8.8941 6.54902C9.51692 6.58587 10.129 6.72823 10.7041 6.97002C11.1627 7.17178 11.6453 7.31362 12.1401 7.39202C12.6861 7.27763 13.2197 7.11017 13.7331 6.89202C14.3408 6.65474 14.9842 6.52187 15.6361 6.49902C15.7231 6.49902 15.8091 6.49902 15.8921 6.50902C17.3216 6.55048 18.6512 7.25221 19.4921 8.40902C18.1551 9.12387 17.3341 10.5303 17.3691 12.046C17.3559 13.1956 17.8352 14.2959 18.6861 15.069C19.069 15.4339 19.5149 15.7262 20.0021 15.932C19.9021 16.232 19.7871 16.522 19.6651 16.814C19.3878 17.4593 19.0457 18.0748 18.6441 18.651C18.265 19.2282 17.8237 19.7621 17.3281 20.243C16.8757 20.6919 16.2727 20.9567 15.6361 20.986C15.0965 20.9621 14.5663 20.8355 14.0741 20.613C13.5433 20.3818 12.9729 20.2551 12.3941 20.24C11.799 20.2517 11.2117 20.3777 10.6641 20.611C10.1911 20.8244 9.68585 20.9572 9.1691 21.004L9.0941 21.006ZM12.2441 6.49902C12.1691 6.49902 12.0941 6.49902 12.0191 6.49002C12.0033 6.37099 11.995 6.25109 11.9941 6.13102C12.0268 5.13216 12.4172 4.17826 13.0941 3.44302C13.4724 3.0206 13.931 2.67762 14.4431 2.43402C14.921 2.18802 15.4432 2.04012 15.9791 1.99902C15.9941 2.13002 15.9941 2.25802 15.9941 2.38002C15.98 3.36317 15.6106 4.308 14.9541 5.04002C14.3106 5.9028 13.3186 6.43689 12.2441 6.49902Z" fill="#2E3A59"/></svg>`,
  xCircled: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22.0002C9.34711 22.0026 6.80218 20.9498 4.9263 19.0739C3.05042 17.198 1.99762 14.6531 2 12.0002V11.8002C2.08179 7.79241 4.5478 4.22035 8.26637 2.72325C11.9849 1.22616 16.2381 2.09308 19.074 4.92619C21.9365 7.78627 22.7932 12.0895 21.2443 15.8278C19.6955 19.5661 16.0465 22.0026 12 22.0002ZM12 13.4102L14.59 16.0002L16 14.5902L13.41 12.0002L16 9.41019L14.59 8.00019L12 10.5902L9.41001 8.00019L8.00001 9.41019L10.59 12.0002L8.00001 14.5902L9.41001 16.0002L12 13.4112V13.4102Z" fill="#2E3A59"/></svg>`,
  tickCircled: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47967 21.994 2.00606 17.5204 2 12V11.8C2.10993 6.30455 6.63459 1.92797 12.1307 2.0009C17.6268 2.07382 22.0337 6.5689 21.9978 12.0654C21.9619 17.5618 17.4966 21.9989 12 22ZM7.41 11.59L6 13L10 17L18 9.00002L16.59 7.58002L10 14.17L7.41 11.59Z" fill="#2E3A59"/></svg>`,
  settings: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.82 22H10.18C9.71009 22 9.30353 21.673 9.20298 21.214L8.79598 19.33C8.25303 19.0921 7.7382 18.7946 7.26098 18.443L5.42398 19.028C4.97598 19.1709 4.48897 18.9823 4.25398 18.575L2.42998 15.424C2.19757 15.0165 2.27764 14.5025 2.62298 14.185L4.04798 12.885C3.98318 12.2961 3.98318 11.7019 4.04798 11.113L2.62298 9.816C2.27713 9.49837 2.19703 8.98372 2.42998 8.576L4.24998 5.423C4.48497 5.0157 4.97198 4.82714 5.41998 4.97L7.25698 5.555C7.50104 5.37416 7.75511 5.20722 8.01798 5.055C8.27032 4.91269 8.53002 4.78385 8.79598 4.669L9.20398 2.787C9.30405 2.32797 9.71017 2.00049 10.18 2H13.82C14.2898 2.00049 14.6959 2.32797 14.796 2.787L15.208 4.67C15.4888 4.79352 15.7622 4.93308 16.027 5.088C16.2743 5.23078 16.5133 5.38736 16.743 5.557L18.581 4.972C19.0287 4.82967 19.5151 5.01816 19.75 5.425L21.57 8.578C21.8024 8.98548 21.7223 9.49951 21.377 9.817L19.952 11.117C20.0168 11.7059 20.0168 12.3001 19.952 12.889L21.377 14.189C21.7223 14.5065 21.8024 15.0205 21.57 15.428L19.75 18.581C19.5151 18.9878 19.0287 19.1763 18.581 19.034L16.743 18.449C16.5104 18.6203 16.2687 18.7789 16.019 18.924C15.7568 19.0759 15.4864 19.2131 15.209 19.335L14.796 21.214C14.6955 21.6726 14.2895 21.9996 13.82 22ZM11.996 8C9.78684 8 7.99598 9.79086 7.99598 12C7.99598 14.2091 9.78684 16 11.996 16C14.2051 16 15.996 14.2091 15.996 12C15.996 9.79086 14.2051 8 11.996 8Z" fill="#2E3A59"/></svg>`,
  playFilled: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9912 22.7422C18.9746 22.7422 23.0879 18.6289 23.0879 13.6543C23.0879 8.67969 18.9658 4.56641 13.9824 4.56641C9.00781 4.56641 4.90332 8.67969 4.90332 13.6543C4.90332 18.6289 9.0166 22.7422 13.9912 22.7422ZM17.542 14.1729L12.2773 17.2578C11.8467 17.5127 11.3457 17.293 11.3457 16.8535V10.4727C11.3457 10.0244 11.873 9.82227 12.2773 10.0596L17.542 13.1621C17.9199 13.3906 17.9287 13.9443 17.542 14.1729Z" fill="#1C1C1E"/></svg>`,
  pauseFilled: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.9912 22.7422C18.9746 22.7422 23.0879 18.6289 23.0879 13.6543C23.0879 8.67969 18.9658 4.56641 13.9824 4.56641C9.00781 4.56641 4.90332 8.67969 4.90332 13.6543C4.90332 18.6289 9.0166 22.7422 13.9912 22.7422ZM11.3809 17.249C10.9062 17.249 10.6777 16.9854 10.6777 16.6074V10.6924C10.6777 10.3145 10.9062 10.0508 11.3809 10.0508H12.3301C12.8047 10.0508 13.0332 10.3145 13.0332 10.6924V16.6074C13.0332 16.9854 12.8047 17.249 12.3301 17.249H11.3809ZM15.6523 17.249C15.1865 17.249 14.9492 16.9854 14.9492 16.6074V10.6924C14.9492 10.3145 15.1865 10.0508 15.6523 10.0508H16.6104C17.0674 10.0508 17.2959 10.3145 17.2959 10.6924V16.6074C17.2959 16.9854 17.0674 17.249 16.6104 17.249H15.6523Z" fill="#1C1C1E"/></svg>`,
  pause: `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.63197 20.9668H11.6974C12.5324 20.9668 12.963 20.5361 12.963 19.7012V7.60742C12.963 6.75488 12.5324 6.35059 11.6974 6.3418H9.63197C8.79701 6.3418 8.36634 6.77246 8.36634 7.60742V19.7012C8.35755 20.5361 8.78822 20.9668 9.63197 20.9668ZM16.3117 20.9668H18.3683C19.2033 20.9668 19.6339 20.5361 19.6339 19.7012V7.60742C19.6339 6.75488 19.2033 6.3418 18.3683 6.3418H16.3117C15.4679 6.3418 15.046 6.77246 15.046 7.60742V19.7012C15.046 20.5361 15.4679 20.9668 16.3117 20.9668Z" fill="#1C1C1E"/></svg>`
};

const timeSince = (date: Date): string => {
  var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000),
    interval = Math.floor(seconds / 31536000);
  if (interval > 1) return interval + " years ago";
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return interval + " months ago";
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval === 1 ? interval + " day ago" : interval + " days ago";
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval === 1 ? interval + ' hour ago' : interval + " hours ago";
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval === 1 ? interval + ' minute ago' : interval + " minutes ago";
  // return Math.floor(seconds) + ' seconds ago';
  return 'Just now';
}

export class Task extends Container {
  time: P;
  timer: H2;
  timerContainer: Container;
  timerInterval: any;
  playButton: EM;
  completeButton: EM;
  body: P;
  constructor(task: SimpleTask, root: App) {
    super();
    this.time = new P().text(timeSince(new Date(task.created))).fontSize(11)
      .color(Theme.colors.grey05);
    this.timer = new H2().text('00:00:00').fontSize(32).color(Theme.colors.grey05).padding([16, 24]).textAlign('center');
    this.timerContainer = new Container().overflow('hidden').height(0).transition('all .3s ease-out')
      .addChild(this.timer);
    const toDouble = (d: number) => ('0' + d.toString()).slice(-2);
    this.playButton = new EM().addClassName(
      task.status === 'active' ? 'ic-play-circle' :
        (task.status === 'playing' && task.pauseStart === undefined) ? 'ic-pause-circle' : 'ic-play-circle-fill'
    ).fontSize(40).color(Theme.colors.grey02)
      .cursor('pointer').on({
        click: () => {
          if (task.status === 'completed') return;
          if (task.status === 'active' || task.status === 'paused') {
            this.playButton.removeClassName(task.status === 'active' ? 'ic-play-circle' : 'ic-play-circle-fill').addClassName('ic-pause-circle');
            this.timerContainer.height(70);
            if (task.pauseStart) {
              task.playStart = Date.now() - (task.pauseStart - task.playStart);
              task.pauseStart = undefined;
            }
            task.playStart = task.playStart || Date.now();
            task.status = 'playing';
            root.shuffleUp(this);
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.timerInterval = setInterval(() => {
              const date = new Date(Date.now() - new Date(task.playStart).getTime());
              this.timer.text(toDouble(date.getHours() - 1) + ':' + toDouble(date.getMinutes()) + ':' + toDouble(date.getSeconds()))
                .color(Theme.colors.orange01);
              root.updateTaskTime(task);
            }, 1000);
          } else {
            this.playButton.removeClassName('ic-pause-circle').addClassName('ic-play-circle-fill');
            this.timerContainer.height(70);
            task.status = 'paused';
            this.timer.color(Theme.colors.grey05);
            task.pauseStart = Date.now();
            root.updateTaskTime(task);
            clearInterval(this.timerInterval);
          }
        }
      });
    this.completeButton = new EM().addClassName(task.status === 'completed' ? 'ic-checkmark-circle-fill' : 'ic-checkmark-circle').fontSize(40)
      .cursor('pointer').color(Theme.colors.green01)
      .lineHeight('0.8').on({
        click: () => {
          if (task.status !== 'completed') root.completeTask(task, this);
          else root.unCompleteTask(task, this);
        }
      });
    this.body = new P().text(task.body).fontSize(15).color(Theme.colors.grey03).wordBreak("break-word");
    if (task.status === 'completed') {
      this.body.textDecoration('line-through').opacity('0.4');
      this.playButton.removeAllClassName().addClassName('ic-play-circle').opacity('0.3')
    }
    this.minWidth(window.innerWidth).addChild(
      this.timerContainer,
      new Container().padding(16).display('grid').gridTemplateColumns('40px 1fr 40px 32px').gap(8)
        .backgroundColor(Theme.colors.white01).borderBottom('1px solid ' + Theme.colors.grey08)
        .addChild(
          this.playButton,
          new Container()
            .addChild(
              this.body,
              this.time.marginTop(8)
            ),
          this.completeButton,
          new EM().addClassName('ic-trash').fontSize(32).color('#c92400').cursor('pointer').on({
            click: () => {
              root.confirmModal = new Modal(root, root.confirmModalTemplate, true);
              root.confirmModal.onClose = (confirm) => {
                if (confirm) root.deleteTask(task, this);
              }
            }
          })
        )
    );
    this.on({
      created: () => {
        setInterval(() => {
          this.time.text(timeSince(new Date(task.created)));
        }, 1000);
        const startTimer = () => {
          if (this.timerInterval) clearInterval(this.timerInterval);
          this.timerInterval = setInterval(() => {
            const date = new Date(Date.now() - new Date(task.playStart).getTime());
            this.timer.text(toDouble(date.getHours() - 1) + ':' + toDouble(date.getMinutes()) + ':' + toDouble(date.getSeconds()))
              .color(Theme.colors.orange01);
            root.updateTaskTime(task);
          }, 1000);
        }
        if (task.status === 'playing' && task.pauseStart === undefined) {
          this.timerContainer.height(70);
          this.timer.color(Theme.colors.orange01);
          startTimer();
        }
        if (task.status === 'paused') {
          this.timerContainer.height(70);
          const time = Date.now() - (task.pauseStart - task.playStart);
          const date = new Date(Date.now() - new Date(time).getTime());
          this.timer.text(toDouble(date.getHours() - 1) + ':' + toDouble(date.getMinutes()) + ':' + toDouble(date.getSeconds()))
            .color(Theme.colors.grey05);
        }
      }
    })
  }
}

export class ClearButton extends Button {
  constructor(text: string, action?: () => void) {
    super();
    this.backgroundColor('transparent').padding([12, 16]).borderRadius(4)
      .fontSize(14).color(Theme.colors.grey03).text(text).border('0px')
      .pseudo({
        ':hover': { backgroundColor: Theme.colors.grey07 }
      }).on({ click: action ? () => action() : () => {} })
  }
}

export class Modal {

  overlay: Container;
  modal: Container;
  root: ELEMENT;
  showing = false;
  onClose?: (confirm: boolean) => void;

  constructor(root: ELEMENT, modal: Container, outsideDimiss?: boolean) {
    if (!root.node()) return;
    this.modal = modal;
    this.root = root;
    const mainRoot = this.root.parent() === undefined;
    this.overlay = new Container().backgroundColor('rgba(0,0,0,0.3)')
      .width('100%').height('100%').position(mainRoot ? 'fixed' : 'absolute').top(0).left(0)
      .opacity('0').transition('all .3s ease-out').zIndex('10000');
    const closeButton = new EM().addClassName('icon-plus').fontSize(32)
      .color(Theme.colors.grey02).transform('rotate(-45deg)').position('absolute')
      .display('inline-flex').alignItems('center').justifyContent('center')
      .top(16).right(16).cursor('pointer').on({ click: () => this.close(false) })
    this.modal.transition('all .3s ease-out').position(mainRoot ? 'fixed' : 'absolute').zIndex('10001');
    if (outsideDimiss) this.overlay.on({ click: () => this.close(false) });
    this.root.addChild(this.overlay);
    this.root.addChild(this.modal);
    this.modal.addChild(closeButton);
    this.modal.top(this.modal.top() ? (<any>this.modal.top()) : 0).opacity('0.3');
    setTimeout(() => {
      this.overlay.opacity('1');
      this.modal.top((<any>this.modal.top()) + 24).opacity('1.0');
    }, 50);
    this.showing = true;
  }

  close = (confirm?: boolean) => {
    this.overlay.opacity('0');
    this.modal.top(this.modal.top() ? (<any>this.modal.top()) - 24 : 0).opacity('0.3');
    setTimeout(() => {
      this.root.removeChild(this.overlay);
      this.root.removeChild(this.modal);
      this.showing = false;
      if (this.onClose) this.onClose(confirm);
    }, 200)
  }
}
