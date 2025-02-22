const quill = new Quill('#editor', { theme: 'snow' });

const quillToAO3 = raw => raw
  .replace(/&nbsp;/g, ' ') // use raw whitespaces
  .replace(/<(\/?)em>/g, (found, el) => `<${el}i>`) // use i over em
  .replace(/<(\/?)strong>/g, (found, el) => `<${el}b>`) // use b over strong
  .replace(/<(p|i|b)>\s/g, (found, el) => ` <${el}>`) // whitespace should go before opening tag
  .replace(/\s<\/(p|i|b)>/g, (found, el) => `<${el}> `) // whitespace should go after opening tag
  .replace(/<(p|i|b)>(<br>)*<\/(\1)>/g, '') // no empty tags/blank lines
  .replace(/<\/p><p>/g, `</p>

<p>`) // new lines between paragraphs are aesthetically pleasing
  .replace(/<p>~+<\/p>/g, '<br /><hr /><br />') // use real page breaks
  .replace(/<span class="ql-cursor">*<\/span>/, ''); // ignore the cursor

const copyForAO3 = () => {
  const raw = quill.getSemanticHTML();
  const formatted = quillToAO3(raw);
  navigator.clipboard.writeText(formatted);
}

const AO3ToQuill = raw => raw
  .replace(/&lt;/g, '<') // use real less than
  .replace(/&gt;/g, '>') // use real greater than
  .replace(/<(p|i|b)>(<br>)*<\/(\1)>/g, '') // no empty tags/blank lines
  .replace(/<br \/><hr \/><br \/>/g, '~~~'); // use fake page breaks

const convertFromAO3 = () => {
  const raw = quill.getSemanticHTML();
  const formatted = quillToAO3(raw);
  // TODO: format this into a Quill Delta to be set as content
  // https://quilljs.com/docs/api#setcontents
  navigator.clipboard.writeText(formatted);
}