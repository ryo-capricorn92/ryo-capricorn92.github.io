const { JSDOM } = require('jsdom');
const path = require('path');
const vm = require('vm');

let dom;
let context;

describe('writing-desk', () => {
  beforeAll(async () => {
    // first we need to load the dom
    dom = await new Promise((resolve) => {
      JSDOM.fromFile(path.resolve(__dirname, './index.html'), {
        runScripts: 'dangerously',
        resources: 'usable',
      }).then(resolve);
    });
    // then we need to wait for the window to load all resources
    await new Promise((resolve) => {
      dom.window.onload = () => resolve();
    });
    // then we need to grab the contextualized environment where the script functions were defined
    context = dom.getInternalVMContext();
  });

  describe('deltaToString()', () => {
    // we'll have to run the script function inside a VM script, so stringify it
    const getScript = (ops) => `deltaToString(${JSON.stringify(ops)})`;

    it('should handle a simple paragraph', () => {
      const ops = [{
        insert: 'Some text',
      }];
      const expected = '<p>Some text</p>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle an italic paragraph', () => {
      const ops = [{
        insert: 'Some text',
        attributes: { italic: true },
      }];
      const expected = '<p><i>Some text</i></p>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle an bold paragraph', () => {
      const ops = [{
        insert: 'Some text',
        attributes: { bold: true },
      }];
      const expected = '<p><b>Some text</b></p>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle styles nested in a paragraph', () => {
      const ops = [{
        insert: 'Some ',
      }, {
        insert: 'real ',
        attributes: { italic: true },
      }, {
        insert: 'bold',
        attributes: { italic: true, bold: true },
      }, {
        insert: ' text',
      }];
      const expected = '<p>Some <i>real <b>bold</b></i> text</p>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should enforce pretty spacing in nested styles', () => {
      const ops = [{
        insert: 'Some ',
      }, {
        insert: 'real',
        attributes: { italic: true },
      }, {
        insert: ' bold ',
        attributes: { italic: true, bold: true },
      }, {
        insert: 'text',
      }];
      const expected = '<p>Some <i>real <b>bold</b></i> text</p>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle new paragraphs', () => {
      const ops = [{
        insert: 'A paragraph.\nAnother paragraph\nAnd another\n\nAn unnecessarily spaced paragraph.',
      }];
      const expected = `<p>A paragraph.</p>

<p>Another paragraph</p>

<p>And another</p>

<p>An unnecessarily spaced paragraph.</p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle styles over multiple paragraphs', () => {
      const ops = [{
        insert: 'Some ',
      }, {
        insert: 'italic text\nacross paragraphs',
        attributes: { italic: true },
      }];
      const expected = `<p>Some <i>italic text</i></p>

<p><i>across paragraphs</i></p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle more complex styles over multiple paragraphs', () => {
      const ops = [{
        insert: 'Testing, ',
      }, {
        attributes: { italic: true },
        insert: 'testing',
      }, {
        insert: '\nnow with',
      }, {
        attributes: { bold: true },
        insert: ' broken ',
      }, {
        attributes: { italic: true, bold: true },
        insert: 'italices\nhehe',
      }, {
        insert: '\nand ',
      }, {
        attributes: { italic: true },
        insert: 'more ',
      }, {
        attributes: { italic: true, bold: true },
        insert: 'broken italics',
      }];
      const expected = `<p>Testing, <i>testing</i></p>

<p>now with <b>broken <i>italices</i></b></p>

<p><i><b>hehe</b></i></p>

<p>and <i>more <b>broken italics</b></i></p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle page breaks', () => {
      const ops = [{
        insert: 'Some random first paragraph with a ',
      }, {
        attributes: { italic: true },
        insert: 'bit ',
      }, {
        insert: 'of emphasis.\n~~~\nAnd another paragraph.',
      }];
      const expected = `<p>Some random first paragraph with a <i>bit</i> of emphasis.</p>

<br /><hr /><br />

<p>And another paragraph.</p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle blockquotes', () => {
      const ops = [{
        insert: '---indented baby',
      }];
      const expected = '<blockquote><p>indented baby</p></blockquote>';

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle simple blockquotes', () => {
      const ops = [{
        insert: 'Paragraph\n---Something blockquoted\nAnother paragraph',
      }];
      const expected = `<p>Paragraph</p>

<blockquote><p>Something blockquoted</p></blockquote>

<p>Another paragraph</p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });

    it('should handle styled blockquotes', () => {
      const ops = [{
        attributes: { bold: true },
        insert: 'a bold starter',
      }, {
        attributes: { bold: true, italic: true },
        insert: ' with an emphatic end',
      }, {
        insert: '\n---An indented bit with a ',
      }, {
        attributes: { italic: true },
        insert: 'bit',
      }, {
        insert: ' of emphasis\nbefore the end',
      }];
      const expected = `<p><b>a bold starter <i>with an emphatic end</i></b></p>

<blockquote><p>An indented bit with a <i>bit</i> of emphasis</p></blockquote>

<p>before the end</p>`;

      const script = new vm.Script(getScript(ops));
      const result = script.runInContext(context);
      expect(result).toBe(expected);
    });
  });
});
