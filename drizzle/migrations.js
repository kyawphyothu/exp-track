import journal from './meta/_journal.json';
import m0000 from './0000_slimy_songbird.sql';
import m0001 from './0001_seed-income-categories.sql';
import m0002 from './0002_seed-expense-categories.sql';
import m0003 from './0003_seed-account-categories.sql';
import m0004 from './0004_seed-currencies.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003,
m0004
    }
  }
  