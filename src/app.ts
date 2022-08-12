import { Container, HR, PageComponent, Span, TextArea } from '@js-native/core/components';
import * as Store from 'electron-store';
import {Task} from './theme';
export const TaskStore = new Store();
export interface SimpleTask {
  id: string,
  body: string,
  created: number
}
export default class App extends PageComponent {

  taskInput: TextArea;
  taskHost: Container;
  constructor() {
    super();
    this.taskInput = new TextArea().type('text').width('100%').padding([12, 16]).height(42).border('1px solid ' + Theme.colors.grey08)
      .backgroundColor(Theme.colors.white01).color(Theme.colors.grey02).fontSize(15).borderRadius(4).fontWeight('500').resize('inherit')
      .on({ 
        input: function() { this.height(this.node().scrollHeight) }, 
        keyup: (e: KeyboardEvent) => { e.preventDefault(); e.code === 'Enter' ? this.saveTask() : '' }
      })
    this.taskHost = new Container().height('100%').width('100%').overflow('scroll').display('flex').flexDirection('column-reverse')
      .global({
        ' > div:first-child': { borderColor: 'transparent' }
      });;
    this.addChild(
      new Container().backgroundColor(Theme.colors.grey09).borderBottom('1px solid ' + Theme.colors.grey07).padding(16)
        .addChild(
          this.taskInput 
        ),
      this.taskHost,
      new Container().backgroundColor('inherit').display('flex').justifyContent('center').position('relative')
        .pseudo({
          ':before': { 
            content: "''", position: 'absolute', width: 'calc(100vw)', top: 'calc(50% - 1px)', height: '2px', backgroundColor: Theme.colors.grey07,
            left: 0
          }
        }).addChild(
        new Span().text('COMPLETED').fontWeight('bold').color(Theme.colors.grey06).backgroundColor(Theme.colors.white01)
            .fontSize(11).position('relative').padding(8),
        )
    );
    (<SimpleTask[]>TaskStore.get('tasklist', [])).forEach((task: SimpleTask) => {
      this.taskHost.addChild(
        new Task(task)
      )
    });
  }

  saveTask() {
    const body = (<any>this.taskInput.node()).value, created = Date.now(), id = created.toString(32);
    this.taskInput.value('').height(42);
    this.taskHost.addChild(new Task({ id, body, created }));
    const tasklist = TaskStore.get('tasklist', []) as SimpleTask[];
    tasklist.push({ id, body, created });
    TaskStore.set('tasklist', tasklist);
  }

}
