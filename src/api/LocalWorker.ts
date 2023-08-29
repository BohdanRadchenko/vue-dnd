export class LocalWorker<ID, Entity> {
  private readonly _key;
  private readonly local: Storage = localStorage;

  constructor(readonly LOCAL_KEY: string) {
    this._key = LOCAL_KEY
  }

  private get key() {
    return this._key;
  }

  private createLocalKey(id: ID): string {
    return `${this.key}:${id}`;
  }

  private stringify(object : Entity): string {
    return JSON.stringify(object);
  }

  public set({id, value} : {id: ID, value: Entity}) {
    this.local.setItem(this.createLocalKey(id), this.stringify(value))
  }

  public create(value: Entity): Entity {
    value.id = Date.now();
    this.set({id: value.id, value})
    return value;
  }

  public remove(id: ID) {
    this.local.removeItem(this.createLocalKey(id))
  }

  public get get(): Map<ID, Entity> {
    const data = {...this.local}
    const result = Object.entries(data)
      .reduce((acc, [k, v]) => {
        const key = k.substring(0, k.indexOf(":"))
        if(key === this.key) {
          const value = JSON.parse(v);
          acc.set(value.id, value);
        }
        return acc;
      }, new Map<ID, Entity>([]))
    return result;
  }

  public getById(id: ID): Entity | null {
    const json = this.local.getItem(this.createLocalKey(id));
    if(!json) {
      return null;
    }
    return JSON.parse(json);
  }
}
