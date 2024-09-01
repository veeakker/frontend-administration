import { helper } from '@ember/component/helper';

export default helper(function humanDate(positional/*, named*/) {
  if( positional ) {
    const date = new Date(positional);
    const dateSpecifier = date.toLocaleDateString();
    const dayOfWeek = date.toLocaleDateString(
      window.navigator.language,
      { weekday: "short" }
    );

    return `${dayOfWeek} ${dateSpecifier}`;
  } else {
    return "";
  }
});
