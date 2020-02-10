import { Client, Message } from "discord.js";
import NodePersist = require("node-persist");
import { HeckFireClient } from "./heck-fire-client";

export class HeckFireBot {
  private _client: HeckFireClient;
  private _token: string;
  private _storage: NodePersist.LocalStorage;
  private _logger: any;

  constructor(
    name: string,
    token: string,
    storage: NodePersist.LocalStorage,
    logger: any
  ) {
    this._client = { client: new Client(), name };
    this._token = token;
    this._storage = storage;
    this._logger = logger;
  }

  private get client() {
    return this._client.client;
  }

  public get user() {
    return this._client.client.user;
  }

  public fetchUser = (id: string) => {
    return this._client.client.fetchUser(id);
  };

  public get name() {
    return this._client.name;
  }

  public get storage(): NodePersist.LocalStorage {
    return this._storage;
  }

  public get logger() {
    return this._logger;
  }

  public login = async () => {
    await this.client.login(this._token);
  };

  public setMessageHandler = async (listener: any) => {
    this.client.on("message", listener(this));
  };

  public setReadyHandler = async (listener: any) => {
    this.client.on("ready", listener(this));
  };
}
