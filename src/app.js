import ghoul, { h } from 'ghoulapp';
import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

const { classes } = jss.createStyleSheet({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
  },
}).attach();

ghoul({
  root: document.querySelector('#root'),
  state: {
    name: 'Ghoul',
  },
  view: ({ name }) => (
    <div className={classes.container}>Hi, I am {name}</div>
  ),
});
