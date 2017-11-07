import ghoul, { h } from 'ghoulapp';

import Page from 'components/Page';

ghoul({
  root: document.querySelector('#root'),
  state: {
    name: 'Ghoul',
  },
  view: ({ name }) => (
    <Page>Hi, I am {name}!</Page>
  ),
});
