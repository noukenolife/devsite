export default interface IDeployer {
  deploy(): Promise<void>;
}
