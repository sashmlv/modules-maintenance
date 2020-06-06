'use strict';

const ch = require( 'chalk' );

/**
 * Constructor
 * @constructor
 **/
class Maintenance {

   /**
    * Log, mainly for development
    * @param  {string} str
    * @param  {function} clb
    * @return {undefined}
    **/
   log( str, ...args ) {

      const clb = typeof args[ args.length - 1 ] === 'function' ? args.pop() : undefined;

      if( clb ) {

         args.length && ( args = args.map( v => clb( v )));
         ! args.length && ( str = clb( str ));
      };

      return console.log( str, ...args );
   };
};

const maintenance = new Maintenance();

maintenance.log.red    = ( ...args ) => maintenance.log( ...args, ch.bold.redBright );
maintenance.log.yellow = ( ...args ) => maintenance.log( ...args, ch.bold.yellowBright );
maintenance.log.blue   = ( ...args ) => maintenance.log( ...args, ch.bold.blueBright );
maintenance.log.greenB = ( ...args ) => maintenance.log( ...args, ch.bold.bgBlack.greenBright );

module.exports = maintenance;
