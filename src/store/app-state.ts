import { observable, action } from 'mobx';

class AppState {
  @observable loggedIn = false;
  @observable user: any = null;
}

const appState = new AppState();
export default appState;
