var questions = [
  {
    question: 'If you have 5 different stylesheets, how would you best integrate them into the site?',
    references: [
      'https://www.impressivewebs.com/best-way-add-css-web-page/',
      'http://ryowheatley.blogspot.com/2016/12/master-vs-multiple-stylesheets-short.html'
    ]
  },{
    question: 'Can you describe the difference between progressive enhancement and graceful degradation?',
    references: [
      'https://www.sitepoint.com/progressive-enhancement-graceful-degradation-basics/',
      'https://www.w3.org/wiki/Graceful_degradation_versus_progressive_enhancement'
    ]
  },{
    question: 'Name 3 ways to decrease page load (perceived or actual load time).',
    references: []
  },{
    question: 'If you jumped on a project and they used tabs and you used spaces, what would you do?',
    references: []
  },{
    question: 'Explain the importance of standards and standards bodies.',
    references: [
      'https://www.sitepoint.com/importance-web-standards/',
      'https://en.wikipedia.org/wiki/Web_standards',
      'https://en.wikipedia.org/wiki/Standards_organization'
    ]
  },{
    question: 'What is Flash of Unstyled Content? How do you avoid FOUC?',
    references: [
      'http://www.techrepublic.com/blog/web-designer/how-to-prevent-flash-of-unstyled-content-on-your-websites/',
      'http://www.robertmullaney.com/2011/08/29/prevent-flash-of-unstyled-content-fouc-jquery/'
    ]
  },{
    question: 'Explain some of the pros and cons for CSS animations versus JavaScript animations.',
    references: [
      'https://css-tricks.com/myth-busting-css-animations-vs-javascript/'
    ]
  },{
    question: 'What does CORS stand for and what issue does it address?',
    references: [
      'https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS'
    ]
  },{
    question: 'What does a doctype do?',
    references: [
      'http://www.htmlgoodies.com/html5/markup/the-doctype-tag-and-its-effect-on-page-rendering.html#fbid=5hnZLqwgxDp',
      'https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode',
      'http://reference.sitepoint.com/css/doctypesniffing',
      'http://stackoverflow.com/questions/7695044/what-does-doctype-html-do#answer-7695336'
    ]
  },{
    question: 'What\'s the difference between full standards mode, almost standards mode and quirks mode?',
    references: [
      'https://developer.mozilla.org/en-US/docs/Quirks_Mode_and_Standards_Mode',
      'https://developer.mozilla.org/en-US/docs/Gecko\'s_Almost_Standards_Mode',
      'http://reference.sitepoint.com/css/doctypesniffing'
    ]
  },{
    question: 'What\'s the difference between HTML and XHTML?',
    references: [
      'https://www.sitepoint.com/web-foundations/differences-html-xhtml/'
    ]
  },{
    question: 'Are there any problems with serving pages as application/xhtml+xml?',
    references: [
      'http://www.456bereastreet.com/archive/200501/the_perils_of_using_xhtml_properly/',
      'https://www.sitepoint.com/web-foundations/differences-html-xhtml/',
      'http://stackoverflow.com/questions/351380/what-are-the-problems-associated-with-serving-pages-with-content-application-xh#answer-351908'
    ]
  },{
    question: 'How do you serve a page with content in multiple languages',
    references: [
      'https://www.nomensa.com/blog/2010/7-tips-for-multi-lingual-website-accessibility',
      'http://www.pro-tekconsulting.com/blog/how-do-you-serve-a-page-with-content-in-multiple-languages/'
    ]
  },{
    question: 'What are data- attributes good for?',
    references: []
  },{
    question: 'Describe the difference between a cookie, sessionStorage and localStorage.',
    references: [
      'http://www.c-sharpcorner.com/uploadfile/cd7c2e/difference-between-local-storage-session-storage-ans-cookie/'
    ]
  },{
    question: 'Describe the difference between <script>, <script async> and <script defer>.',
    references: []
  },{
    question: 'Why is it generally a good idea to position CSS <link>s between <head></head> and JS <script>s just before </body>? Do you know any exceptions?',
    references: []
  },{
    question: 'What is progressive rendering?',
    references: []
  },{
    question: 'Have you used different HTML templating languages before?',
    references: [
      'http://stackoverflow.com/questions/18174856/whats-the-use-of-jade-or-handlebars-when-writing-angularjs-apps'
    ]
  },{
    question: 'What is the difference between classes and IDs in CSS?',
    references: []
  },{
    question: 'What\'s the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?',
    references: []
  },{
    question: 'Describe Floats and how they work.',
    references: []
  },{
    question: 'Describe z-index and how stacking context is formed.',
    references: []
  },{
    question: 'Describe BFC(Block Formatting Context) and how it works.',
    references: []
  },{
    question: 'What are the various clearing techniques and which is appropriate for what context?',
    references: [
      'https://www.sitepoint.com/clearing-floats-overview-different-clearfix-methods/'
    ]
  },{
    question: 'Explain CSS sprites, and how you would implement them on a page or site.',
    references: []
  },{
    question: 'What are your favourite image replacement techniques and which do you use when?',
    references: []
  },{
    question: 'How would you approach fixing browser-specific styling issues?',
    references: []
  },{
    question: 'How do you serve your pages for feature-constrained browsers?',
    references: []
  },{
    question: 'What are the different ways to visually hide content (and make it available only for screen readers)?',
    references: [
      'http://webaim.org/techniques/css/invisiblecontent/'
    ]
  },{
    question: 'Have you ever used a grid system, and if so, what do you prefer?',
    references: []
  },{
    question: 'Have you used or implemented media queries or mobile specific layouts/CSS?',
    references: []
  },{
    question: 'Are you familiar with styling SVG?',
    references: []
  },{
    question: 'How do you optimize your webpages for print?',
    references: []
  },{
    question: 'What are some of the "gotchas" for writing efficient CSS?',
    references: [
      'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS'
    ]
  },{
    question: 'What are the advantages/disadvantages of using CSS preprocessors?',
    references: []
  },{
    question: 'How would you implement a web design comp that uses non-standard fonts?',
    references: []
  },{
    question: 'Explain how a browser determines what elements match a CSS selector.',
    references: [
      'https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Writing_efficient_CSS'
    ]
  },{
    question: 'Describe pseudo-elements and discuss what they are used for.',
    references: []
  },{
    question: 'Explain your understanding of the box model and how you would tell the browser in CSS to render your layout in different box models.',
    references: [
      'https://css-tricks.com/the-css-box-model/',
      'https://css-tricks.com/box-sizing/'
    ]
  },{
    question: 'What does * { box-sizing: border-box; } do? What are its advantages?',
    references: []
  },{
    question: 'List as many values for the display property that you can remember.',
    references: [
      'https://developer.mozilla.org/en-US/docs/Web/CSS/display#Values'
    ]
  },{
    question: 'What\'s the difference between inline and inline-block?',
    references: []
  },{
    question: 'What\'s the difference between a relative, fixed, absolute and statically positioned element?',
    references: []
  },{
    question: 'The \'C\' in CSS stands for Cascading. How is priority determined in assigning styles (a few examples)? How can you use this system to your advantage?',
    references: []
  },{
    question: 'What existing CSS frameworks have you used locally, or in production? How would you change/improve them?',
    references: []
  },{
    question: 'Have you played around with the new CSS Flexbox or Grid specs?',
    references: []
  },{
    question: 'How is responsive design different from adaptive design?',
    references: []
  },{
    question: 'Have you ever worked with retina graphics? If so, when and what techniques did you use?',
    references: []
  },{
    question: 'Is there any reason you\'d want to use translate() instead of absolute positioning, or vice-versa? And why?',
    references: []
  },{
    question: 'Explain event delegation',
    references: []
  },{
    question: 'Explain how this works in JavaScript',
    references: []
  },{
    question: 'Explain how prototypal inheritance works',
    references: []
  },{
    question: 'What do you think of AMD vs CommonJS?',
    references: []
  },{
    question: 'Explain why the following doesn\'t work as an IIFE: function foo(){ }();. What needs to be changed to properly make it an IIFE?',
    references: []
  },{
    question: 'What\'s the difference between a variable that is: null, undefined or undeclared?',
    references: []
  },{
    question: 'What is a closure, and how/why would you use one?',
    references: []
  },{
    question: 'What\'s a typical use case for anonymous functions?',
    references: []
  },{
    question: 'How do you organize your code? (module pattern, classical inheritance?)',
    references: []
  },{
    question: 'What\'s the difference between host objects and native objects?',
    references: []
  },{
    question: 'Difference between: function Person(){}, var person = Person(), and var person = new Person()?',
    references: []
  },{
    question: 'What\'s the difference between .call and .apply?',
    references: []
  },{
    question: 'Explain Function.prototype.bind.',
    references: []
  },{
    question: 'When would you use document.write()?',
    references: []
  },{
    question: 'What\'s the difference between feature detection, feature inference, and using the UA string?',
    references: []
  },{
    question: 'Explain Ajax in as much detail as possible.',
    references: []
  },{
    question: 'What are the advantages and disadvantages of using Ajax?',
    references: []
  },{
    question: 'Explain how JSONP works (and how it\'s not really Ajax).',
    references: []
  },{
    question: 'Have you ever used JavaScript templating?',
    references: []
  },{
    question: 'Explain "hoisting".',
    references: []
  },{
    question: 'Describe event bubbling.',
    references: []
  },{
    question: 'What\'s the difference between an "attribute" and a "property"?',
    references: [
      'http://lucybain.com/blog/2014/attribute-vs-property/'
    ]
  },{
    question: 'Why is extending built-in JavaScript objects not a good idea?',
    references: []
  },{
    question: 'Difference between document load event and document DOMContentLoaded event?',
    references: []
  },{
    question: 'What is the difference between == and ===?',
    references: []
  },{
    question: 'Explain the same-origin policy with regards to JavaScript.',
    references: []
  },{
    question: 'Why is it called a Ternary expression, what does the word "Ternary" indicate?',
    references: []
  },{
    question: 'What is "use strict";? what are the advantages and disadvantages to using it?',
    references: []
  },{
    question: 'Why is it, in general, a good idea to leave the global scope of a website as-is and never touch it?',
    references: []
  },{
    question: 'Why would you use something like the load event? Does this event have disadvantages? Do you know any alternatives, and why would you use those?',
    references: []
  },{
    question: 'Explain what a single page app is and how to make one SEO-friendly.',
    references: []
  },{
    question: 'What is the extent of your experience with Promises and/or their polyfills?',
    references: [
      'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise',
      'https://github.com/taylorhakes/promise-polyfill'
    ]
  },{
    question: 'What are the pros and cons of using Promises instead of callbacks?',
    references: []
  },{
    question: 'What are some of the advantages/disadvantages of writing JavaScript code in a language that compiles to JavaScript?',
    references: []
  },{
    question: 'What tools and techniques do you use debugging JavaScript code?',
    references: []
  },{
    question: 'What language constructions do you use for iterating over object properties and array items?',
    references: [
      'http://qnimate.com/foreach-vs-for-of-vs-for-in-in-javascript/'
    ]
  },{
    question: 'Explain the difference between mutable and immutable objects.',
    references: [
      'https://www.sitepoint.com/immutability-javascript/'
    ]
  },{
    question: 'What is an example of an immutable object in JavaScript?',
    references: []
  },{
    question: 'What are the pros and cons of immutability?',
    references: []
  },{
    question: 'Explain the difference between synchronous and asynchronous functions.',
    references: []
  },{
    question: 'What is event loop? What is the difference between call stack and task queue?',
    references: []
  },{
    question: 'Explain the differences on the usage of foo between function foo() {} and var foo = function() {}',
    references: []
  },{
    question: 'What are some advantages/disadvantages to testing your code?',
    references: []
  },{
    question: 'What tools would you use to test your code\'s functionality?',
    references: []
  },{
    question: 'What is the difference between a unit test and a functional/integration test?',
    references: []
  },{
    question: 'What is the purpose of a code style linting tool?',
    references: []
  },{
    question: 'What tools would you use to find a performance bug in your code?',
    references: []
  },{
    question: 'What are some ways you may improve your website\'s scrolling performance?',
    references: []
  },{
    question: 'Explain the difference between layout, painting and compositing.',
    references: []
  },{
    question: 'Traditionally, why has it been better to serve site assets from multiple domains?',
    references: []
  },{
    question: 'Do your best to describe the process from the time you type in a website\'s URL to it finishing loading on your screen.',
    references: []
  },{
    question: 'What are the differences between Long-Polling, Websockets and Server-Sent Events?',
    references: []
  },{
    question: 'What are HTTP methods? List all HTTP methods that you know, and explain them.',
    references: []
  },{
    question: 'In the MVC design pattern what\'s M stands for? ',
    references: []
  },{
    question: 'Describe server response code 200.',
    references: [
      'https://httpstatuses.com/200'
    ]
  },{
    question: 'Describe server response code 201.',
    references: [
      'https://httpstatuses.com/201'
    ]
  },{
    question: 'Describe server response code 204.',
    references: [
      'https://httpstatuses.com/204'
    ]
  },{
    question: 'Describe server response code 301.',
    references: [
      'https://httpstatuses.com/301'
    ]
  },{
    question: 'Describe server response code 400.',
    references: [
      'https://httpstatuses.com/400'
    ]
  },{
    question: 'Describe server response code 404.',
    references: [
      'https://httpstatuses.com/404'
    ]
  },{
    question: 'Describe server response code 409.',
    references: [
      'https://httpstatuses.com/409'
    ]
  },{
    question: 'Describe server response code 500.',
    references: [
      'https://httpstatuses.com/500'
    ]
  },{
    question: 'What are some advantages of CDNs? Disadvantages?',
    references: []
  },{
    question: 'What is a reverse proxy?',
    references: [
      'http://stackoverflow.com/questions/224664/difference-between-proxy-server-and-reverse-proxy-server'
    ]
  },{
    question: 'Why Functional Programming matters? When should a functional programming language be used?',
    references: []
  },{
    question: 'Pro and cons of mutable and immutable values.',
    references: [
      'https://www.sitepoint.com/immutability-javascript/'
    ]
  },{
    question: 'What are the tradeoffs of client-side rendering vs. server-side rendering?',
    references: []
  },{
    question: 'How would you manage the migration of a project from MySQL to PostgreSQL?',
    references: [
      'http://docs.sequelizejs.com/en/latest/docs/migrations/'
    ]
  },{
    question: 'How is Lazy Loading achieved? When is it useful? What are its pitfalls?',
    references: []
  },{
    question: 'In which case would you use a document database like MongoDB instead of a relational database like MySQL or PostgreSQL?',
    references: []
  },{
    question: 'What\'s a rebase?',
    references: [
      'https://nathanleclaire.com/blog/2014/09/14/dont-be-scared-of-git-rebase/'
    ]
  },{
    question: 'What is the biggest difference between Agile and Waterfall?',
    references: []
  },{
    question: 'When is a cache not useful or even dangerous?',
    references: []
  },{
    question: 'What is the difference between emergent design and evolutionary architecture?',
    references: []
  },{
    question: 'Scale out vs scale up: how are they different? When to apply one, when the other?',
    references: []
  },{
    question: 'What\'s Two Factor Authentication? How would you implement it in an existing web application?',
    references: []
  },{
    question: 'Explain the basic structure of a MIME multipart message when used to transfer different content type parts. Provide a simple example.',
    references: []
  },{
    question: 'Explain the difference between stateless and stateful protocols. Which type of protocol is HTTP? Explain your answer.',
    references: []
  },{
    question: 'Describe the key advantages of HTTP/2 as compared with HTTP 1.1.',
    references: []
  },{
    question: 'What is a “MIME type”, what does it consist of, and what is it used for? Provide an example.',
    references: []
  },{
    question: 'What are the main differences between a document database and a SQL database? Which would you consider "more efficient"?',
    references: []
  },{
    question: 'What will the .length property return on a function?',
    references: [
      'https://repl.it/EqFw/1'
    ]
  }
  // {
  //   question: '',
  //   references: []
  // },

]
