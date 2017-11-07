import jss from 'jss';
import preset from 'jss-preset-default';

jss.setup(preset());

export function create(style) {
  const { classes } = jss.createStyleSheet(style).attach();
  return classes;
}