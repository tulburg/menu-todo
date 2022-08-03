import { H1, PageComponent } from '@js-native/core/components';

export default class App extends PageComponent {

  constructor() {
    super();
    this.addChild(
      new H1().text('Hello world').color('black')
    )
  }

}
