import { markdownToPlainText } from '../../src/utils/markdownToPlainText';

describe('markdownToPlainText', () => {
  it('should convert a markdown to the plain text', () => {
    const markdown =
`
# Test Title
\`\`\`This is a test markdown\`\`\`
`;

    const expected = 'Test Title This is a test markdown';

    expect(markdownToPlainText(markdown)).toBe(expected);
  });
});
