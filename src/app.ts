import { Container, PageComponent, TextArea } from '@js-native/core/components';
import * as Store from 'electron-store';
import {Task} from './theme';
export const TaskStore = new Store();
export interface SimpleTask {
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
      });
    this.taskHost = new Container().height('100%').width('100%').overflow('scroll').display('flex').flexDirection('column-reverse');
    this.addChild(
      new Container().backgroundColor(Theme.colors.grey09).borderBottom('1px solid ' + Theme.colors.grey07).padding(16)
        .addChild(
          this.taskInput 
        ),
      this.taskHost
    )
  }

  saveTask() {
    const body = (<any>this.taskInput.node()).value;
    this.taskInput.value('').height(42);
    this.taskHost.addChild(new Task({ body, created: Date.now() }))
  }

}
