import sourcemaps from 'rollup-plugin-sourcemaps';

// since rollup plugins cant be enabled from the command-line,
// we need to configure the sourcemaps plugin here
export default {
  plugins: [sourcemaps()]
};