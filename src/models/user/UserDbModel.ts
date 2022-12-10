import ICollectionSettings from "src/interfaces/collection/ICollectionSettings";
import IUserNotifications from "src/interfaces/user/IUserNotifications";

export default class UserDbModel {
  username: string;
  collectionSettings: ICollectionSettings;
  notifications: IUserNotifications;
  selectedGame: string;

  constructor(username: string) {
    this.username = username;
    this.collectionSettings = { shinyView: "All Normal" };
    this.notifications = { whatsNew: true };
    this.selectedGame = "Scarlet / Violet";
  }

  getDbObject() {
    return {
      username: this.username,
      collectionSettings: this.collectionSettings,
      notifications: this.notifications,
      selectedGame: this.selectedGame
    };
  }
}