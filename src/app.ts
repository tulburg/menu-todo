import { ELEMENT, Container, H4, PageComponent, Span, Textarea } from '@javascriptui/core';
import { ipcRenderer } from 'electron';
import * as Store from 'electron-store';
import { ClearButton, Modal, Task } from './theme';
export const TaskStore = new Store();
export interface SimpleTask {
  id: string,
  body: string,
  created: number,
  playStart?: number,
  pauseStart?: number,
  status: 'active' | 'deleted' | 'paused' | 'playing' | 'completed'
}
export default class App extends PageComponent {

  taskInput: Textarea;
  taskHost: Container;
  completedHost: Container;
  confirmModalTemplate: Container;
  confirmModal?: Modal;
  completedSeparator: Container;
  taskInputContainer: Container;
  constructor() {
    super();
    let lastHeight = 0;
    const self = this;
    this.taskInput = new Textarea().attrType('text').width('100%').padding([12, 16]).height(42).border('1px solid ' + Theme.colors.grey08)
      .backgroundColor(Theme.colors.white01).color(Theme.colors.grey02).fontSize(15).borderRadius(4).fontWeight('500').resize('inherit')
      .attrPlaceholder('Start a todo...')
      .on({
        input: function () {
          this.height('auto');
          this.height(this.node().scrollHeight);
          if (this.node().scrollHeight !== lastHeight) self.onCreate();
          lastHeight = this.node().scrollHeight;
        },
        keyup: (e: KeyboardEvent) => { e.preventDefault(); e.code === 'Enter' ? this.createTask() : '' },
        blur: function () { if ((<any>this.node()).value === '') this.height(42) }
      });
    this.taskInputContainer = new Container().backgroundColor(Theme.colors.grey09).borderBottom('1px solid ' + Theme.colors.grey07).padding(16)
      .position('fixed').width('100%').zIndex('10')
      .addChild(this.taskInput)
    this.confirmModalTemplate = new Container().display('flex').flexDirection('column')
      .backgroundColor(Theme.colors.white01).borderRadius(12).padding(24).alignItems('center')
      .left('50%').top(100).transform('translateX(-50%)').width(296)
      .addChild(
        new H4().text('Are you sure you want to delete this task?').textAlign('center').paddingBottom(24).color(Theme.colors.grey03)
          .lineHeight('1.3'),
        new Container().display('flex')
          .addChild(
            new ClearButton('Cancel', () => { this.confirmModal?.close(false) }).fontWeight('bold').color(Theme.colors.grey05),
            new ClearButton('Delete', () => { this.confirmModal?.close(true) }).color(Theme.colors.red01)
          )
      )
    this.taskHost = new Container().height('100%').width('calc(100% + 6px)').overflow('scroll').display('flex').flexDirection('column-reverse')
      .paddingRight(6);
    this.completedHost = new Container().display('flex').flexDirection('column').position('relative').minWidth(window.innerWidth)
      .transition('all .3s ease-out');
    this.completedSeparator = new Container().backgroundColor(Theme.colors.white01).display('flex').justifyContent('center').position('relative')
      .transition('all .3s ease-out').top(-1).minWidth(window.innerWidth)
      .pseudo({
        ':before': {
          content: "''", position: 'absolute', width: 'calc(100vw)', top: 'calc(50% - 1px)', height: '2px', backgroundColor: Theme.colors.grey07,
          left: 0
        }
      }).addChild(
        new Span().text('COMPLETED').fontWeight('bold').color(Theme.colors.grey06).backgroundColor(Theme.colors.white01)
          .fontSize(11).position('relative').padding(8)
      );
    this.addChild(
      this.taskInputContainer,
      this.taskHost,
      this.completedSeparator,
      this.completedHost
    );
    (<SimpleTask[]>TaskStore.get('tasklist', []))
      .filter(i => i.status === 'active' || i.status === 'playing' || i.status === 'paused')
      .sort((a, b) => {
        return a.status === 'playing' && b.status !== 'playing' ? 1 : a.status === 'active' && b.status !== 'active' ? -1 : 0;
      }).forEach((task: SimpleTask) => {
        this.taskHost.addChild(
          new Task(task, this).position('absolute').transition('all .3s ease-out').top(0)
        )
      });
    (<SimpleTask[]>TaskStore.get('tasklist', []))
      .filter(i => i.status === 'completed').forEach((task: SimpleTask) => {
        this.completedHost.addChild(
          new Task(task, this)
        )
      });
    this.updateTitle();
  }

  onCreate() {
    setTimeout(() => {
      let top = (<any>this.taskInputContainer.node()).offsetHeight;
      Array.from(this.taskHost.children()).reverse().forEach((child: ELEMENT, index) => {
        if (!child) return;
        child.top(top);
        top = top + (<any>child.node()).offsetHeight;
        if (index === this.taskHost.children().length - 1) {
          this.taskHost.height(top);
        }
      });
    }, 100);
    this.updateTitle();
  }

  createTask() {
    const body = (<any>this.taskInput.node()).value, created = Date.now(), id = created.toString(32), status = 'active';
    this.taskInput.attrValue('').height(42);
    const task = new Task({ id, body, created, status }, this);
    task.transition('all .3s ease-out').position('absolute').top(0);
    this.taskHost.addChild(task);
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    tasklist.push({ id, body, created, status });
    TaskStore.set('tasklist', tasklist);
    this.updateTitle();
    this.onCreate();
  }

  completeTask(task: SimpleTask, taskElement: Task) {
    taskElement.timerContainer.height(0);
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    const t = tasklist.find(i => i.id === task.id);
    t.status = 'completed';
    this.taskHost.removeChild(taskElement);
    this.onCreate();
    taskElement.position('relative').top(0);
    this.completedHost.addChild(taskElement);
    taskElement.timerContainer.height(0);
    taskElement.playButton.removeAllClassName().addClassName('ic-play-circle').opacity('0.3')
    taskElement.completeButton.removeAllClassName().addClassName('ic-checkmark-circle-fill')
    taskElement.body.textDecoration('line-through').opacity('0.4')
    task.status = 'completed';
    TaskStore.set('tasklist', tasklist);
    this.updateTitle();
  }

  unCompleteTask(task: SimpleTask, taskElement: Task) {
    console.log(task, taskElement);
  }

  deleteTask(task: SimpleTask, taskElement: Task) {
    let tasklist = TaskStore.get('tasklist', []) as SimpleTask[],
      t = tasklist.find(i => i.id === task.id), index = tasklist.indexOf(t);
    if (task.status === 'completed') this.completedHost.removeChild(taskElement);
    else this.taskHost.removeChild(taskElement);
    tasklist.splice(index, 1, undefined);
    tasklist = tasklist.filter(i => i !== undefined);
    TaskStore.set('tasklist', tasklist);
    this.updateTitle();
    this.onCreate();
  }

  updateTaskTime(task: SimpleTask) {
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    const t = tasklist.find(i => i.id === task.id)
    t.playStart = task.playStart;
    t.pauseStart = task.pauseStart;
    t.status = task.status;
    TaskStore.set('tasklist', tasklist);
  }

  shuffleUp(task: Container) {
    const children: Container[] = Array.from(this.taskHost.children()).reverse() as any, index = children.indexOf(task);
    const height = (<any>task.node()).offsetHeight;
    for (let i = 0; i < index; i++) {
      if (children[i]) children[i].top(children[i].top() + height);
    }
    task.top(78);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.taskHost.children().sort((a, b) => {
      if (this.taskHost.children().indexOf(a) === this.taskHost.children().indexOf(task)) {
        return 1;
      } else if (this.taskHost.children().indexOf(b) === this.taskHost.children().indexOf(task)) {
        return -1;
      } else return 0
    });
  }

  updateTitle() {
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    ipcRenderer.send('update-title', tasklist.filter(i => i.status === 'completed').length + '/' + tasklist.length);
  }

}
