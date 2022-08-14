import { Container, H4, HR, PageComponent, Span, TextArea } from '@js-native/core/components';
import {RxElement} from '@js-native/core/types';
import * as Store from 'electron-store';
import {ClearButton, Modal, Task} from './theme';
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

  taskInput: TextArea;
  taskHost: Container;
  confirmModalTemplate: Container;
  confirmModal?: Modal;
  completedSeparator: Container;
  constructor() {
    super();
    this.taskInput = new TextArea().type('text').width('100%').padding([12, 16]).height(42).border('1px solid ' + Theme.colors.grey08)
      .backgroundColor(Theme.colors.white01).color(Theme.colors.grey02).fontSize(15).borderRadius(4).fontWeight('500').resize('inherit')
      .placeholder('Start a todo...')
      .on({ 
        input: function() { this.height(this.node().scrollHeight) }, 
        keyup: (e: KeyboardEvent) => { e.preventDefault(); e.code === 'Enter' ? this.createTask() : '' }
      });
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
    this.taskHost = new Container().height('100%').width('100%').overflow('scroll').display('flex').flexDirection('column-reverse')
      // .global({
      //   ' > div:first-child > div:last-child': { borderColor: 'transparent' }
      // });
    this.completedSeparator = new Container().backgroundColor('inherit').display('flex').justifyContent('center').position('relative')
      .transition('all .3s ease-out').top(0)
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
      new Container().backgroundColor(Theme.colors.grey09).borderBottom('1px solid ' + Theme.colors.grey07).padding(16)
        .position('fixed').width('100%').zIndex('10')
        .addChild(
          this.taskInput 
        ),
      this.taskHost,
      this.completedSeparator
    );
    (<SimpleTask[]>TaskStore.get('tasklist', []))
      .filter(i => i.status === 'active' || i.status === 'playing' || i.status === 'paused')
      .sort((a,b) => {
        return a.status === 'playing' && b.status !== 'playing' ? 1 : a.status === 'active' && b.status !== 'active' ? -1 : 0;
        // return a.status === 'playing' || b.status === 'playing' || a.status === 'paused' || b.status === 'paused' ? 1 : -1
      })
      .forEach((task: SimpleTask) => {
      this.taskHost.addChild(
        new Task(task, this).position('absolute').transition('all .3s ease-out').top(0)
      )
    });
  }

  onCreate() {
    setTimeout(() => {
      let top = 78;
      Array.from(this.taskHost.children()).reverse().forEach((child: RxElement, index) => {
        child.top(top);
        top = top + (<any>child.node()).offsetHeight;
        if(index === this.taskHost.children().length - 1) {
          (<any>this.completedSeparator.node()).style.top = top + 'px';
        }
      });
    }, 100);
  }

  createTask() {
    const body = (<any>this.taskInput.node()).value, created = Date.now(), id = created.toString(32), status = 'active';
    this.taskInput.value('').height(42);
    const task = new Task({ id, body, created, status }, this);
    task.on({ created: () => {
      task.transition('all .3s ease-out').position('absolute').top(78);
      this.onCreate();
    } })
    this.taskHost.addChild(task).position('absolute').transition('all .3s ease-out').top(0);
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    tasklist.push({ id, body, created, status });
    TaskStore.set('tasklist', tasklist);
  }

  completeTask(task: SimpleTask) {
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    tasklist.find(i => i.id === task.id).status = 'completed';
    TaskStore.set('tasklist', tasklist);
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
    for(let i = 0; i < index; i++) {
      children[i].top(children[i].top() + height);
    }
    task.top(78);
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.taskHost.children().sort((a, b) => {
      if(this.taskHost.children().indexOf(a) === this.taskHost.children().indexOf(task)){
        return 1;
      }else if(this.taskHost.children().indexOf(b) === this.taskHost.children().indexOf(task)) {
        return -1;
      }else return 0
    });
  }

}
