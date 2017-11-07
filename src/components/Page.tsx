import ghoul, { h } from 'ghoulapp';

import * as StyleSheet from 'utils/StyleSheet';

const classes = StyleSheet.create({
  page: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 32,
  },
});

export default function ({ children }) {
  return (
    <div className={classes.page}>
      {children}
    </div>
  );
}