import { TokenView } from './models';

const tokenView = new TokenView();
const host = 'http://localhost:8080';

const extractAmount = (raw) => {
  try {
    const parsed = JSON.parse(raw);
    return parseInt(parsed.result.output, 10);
  } catch (e) {
    return -1;
  }
};

// eslint-disable-next-line no-unused-expressions
fixture`Multi Token`
  .page`${host}`;

test('should get total supply', async (t) => {
  await t
    .click(tokenView.buttonGetTotalSupply)
    .expect(tokenView.response.innerText)
    .match(new RegExp('"output": "[0-9]+"'));

  const amount = extractAmount(await tokenView.response.innerText);
  await t
    .expect(amount)
    .gt(0);
});

test('should mint tokens', async (t) => {
  await t.click(tokenView.buttonGetTotalSupply);
  const amountBefore = extractAmount(await tokenView.response.innerText);

  await t
    .typeText(
      tokenView.inputTokens,
      '1',
      { paste: true, replace: true },
    )
    .click(tokenView.buttonMintTokens)
    .expect(tokenView.response.innerText)
    .match(new RegExp('"hash": "0x[a-f0-9]{64}"'));

  // Compare "after" to "before" and "after" should be greater
  await t.click(tokenView.buttonGetTotalSupply);
  const amountAfter = extractAmount(await tokenView.response.innerText);
  await t
    .expect(amountAfter)
    .gt(amountBefore);
});
