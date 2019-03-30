export interface IDeployer {
  deploy(): Promise<void>;
}
