const quill = new Quill('#editor', { theme: 'snow' });

// eslint-disable-next-line no-unused-vars
const deltaToString = (ops) => {
  const acc = ops.reduce(({ attrs, text }, { attributes, insert }, i) => {
    let converted = text;
    // let blockquote = false;
    const last = i === (ops.length - 1);

    insert.split('\n').forEach((str, n, arr) => {
      if (!str) { return; }
      const nLast = n === (arr.length - 1);

      // don't close a paragraph tag for the first entry
      if (n) {
        // if this comes after a \n, end the paragraph and start a new one
        converted += '</p><p>';
      }

      // open style tags
      if (attributes?.italic) {
        converted += '<i>';
      }
      if (attributes?.bold) {
        converted += '<b>';
      }

      // add the raw text
      converted += str;

      // close style tags
      if (attributes?.italic && attributes?.bold) {
        // if they're both being closed, try to do it in the right order
        if (!n && !attrs.italic) {
          converted += '</i></b>';
        } else {
          converted += '</b></i>';
        }
      } else if (attributes?.italic) {
        converted += '</i>';
      } else if (attributes?.bold) {
        converted += '</b>';
      }

      // ending paragraph tag should only be added to the last insert of the last paragraph
      if (last && nLast) {
        converted += '</p>';
      }
    });

    return {
      attrs: {
        italic: !!attributes?.italic,
        bold: !!attributes?.bold,
      },
      text: converted,
    };
  }, {
    attrs: { italic: false, bold: false },
    text: '<p>',
  });

  const formatted = acc.text
    .replace(/<(p|i|b)>\s/g, (found, el) => ` <${el}>`) // whitespace should go before opening tag;
    .replace(/<(p|i|b)>\s/g, (found, el) => ` <${el}>`) // and again for nested styles
    .replace(/\s<\/(p|i|b)>/g, (found, el) => `</${el}> `) // whitespace should go after closing tag
    .replace(/\s<\/(p|i|b)>/g, (found, el) => `</${el}> `) // and again for nested styles
    .replace(/(<\/?p>)\s+/g, (found, el) => el) // empty spaces after paragraph tags are never needed
    .replace(/<\/(i|b)>(\s*(<[ib]>)?)<\1>/g, (found, el, space) => space) // no redundant style tagging
    .replace(/<(p|i|b)>(<br>)*<\/(\1)>/g, '') // no empty tags/blank lines
    .replace(/<\/p><p>/g, `</p>

<p>`) // new lines between paragraphs are aesthetically pleasing
    .replace(/<p>~+<\/p>/g, '<br /><hr /><br />'); // use real page breaks

  return formatted.split(`

`)
    .map((line) => {
      if (line.includes('---')) {
        return `<blockquote>${line.replace(/---/g, '')}</blockquote>`;
      }
      return line;
    })
    .join(`

`);
};

// eslint-disable-next-line no-unused-vars
const copyForAO3 = () => {
  const delta = quill.getContents();
  const formatted = deltaToString(delta.ops);
  navigator.clipboard.writeText(formatted);
};

// eslint-disable-next-line no-unused-vars
const AO3ToQuill = (raw) => raw
  .replace(/&lt;/g, '<') // use real less than
  .replace(/&gt;/g, '>') // use real greater than
  .replace(/<(p|i|b)>(<br>)*<\/(\1)>/g, '') // no empty tags/blank lines
  .replace(/<br \/><hr \/><br \/>/g, '~~~'); // use fake page breaks

// eslint-disable-next-line no-unused-vars
const convertFromAO3 = () => {
  const raw = quill.getSemanticHTML();
  const formatted = AO3ToQuill(raw);
  // TODO: format this into a Quill Delta to be set as content
  // https://quilljs.com/docs/api#setcontents
  navigator.clipboard.writeText(formatted);
};
