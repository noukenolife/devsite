import IDeployer from "@/ports/deployment/IDeployer";

export default class Deploy {
  protected _deployer: IDeployer;

  public constructor(deployer: IDeployer) {
    this._deployer = deployer;
  }

  public async invoke(): Promise<void> {
    return this._deployer.deploy();
  }
}
