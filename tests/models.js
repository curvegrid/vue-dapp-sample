import { Selector } from 'testcafe';

// eslint-disable-next-line import/prefer-default-export
export class TokenView {
  constructor() {
    this.buttonGetTotalSupply = Selector('button').withText('Get Total MltiToken Supply');
    this.buttonMintTokens = Selector('button').withText('Mint Tokens');
    this.inputTokens = Selector('input');
    this.response = Selector('pre');
  }
}
