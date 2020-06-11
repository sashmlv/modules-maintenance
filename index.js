'use strict';

const ch = require( 'chalk' );

/**
 * Maintenance for development
 **/
class Maintenance {

   /**
    * Log
    * @param  {string} str
    * @param  {function} clb
    * @return {undefined}
    **/
   log( str, ...args ) {

      const clb = typeof args[ args.length - 1 ] === 'function' ? args.pop() : undefined;

      if( clb ) {

         args.length && ( str = clb( str ), args = args.map( v => clb( v )));
         ! args.length && ( str = clb( str ));
      };

      return console.log( str, ...args );
   };

   /**
    * Stdout
    * @param  {string} str
    * @param  {function} clb
    * @return {undefined}
    **/
   stdout( str, ...args ) {

      const clb = typeof args[ args.length - 1 ] === 'function' ? args.pop() : undefined;

      if( clb ) {

         args.length && ( str = clb( str ), args = args.map( v => clb( v )));
         ! args.length && ( str = clb( str ));
      };

      return process.stdout.write( `${ str } ${ args.join( ' ' ) }` );
   };
};

const maintenance = new Maintenance();

maintenance.log.red    = ( ...args ) => maintenance.log( ...args, ch.bold.redBright );
maintenance.log.yellow = ( ...args ) => maintenance.log( ...args, ch.bold.yellowBright );
maintenance.log.blue   = ( ...args ) => maintenance.log( ...args, ch.bold.blueBright );
maintenance.log.greenB = ( ...args ) => maintenance.log( ...args, ch.bold.bgBlack.greenBright );

maintenance.stdout.red    = ( ...args ) => maintenance.stdout( ...args, ch.bold.redBright );
maintenance.stdout.yellow = ( ...args ) => maintenance.stdout( ...args, ch.bold.yellowBright );
maintenance.stdout.blue   = ( ...args ) => maintenance.stdout( ...args, ch.bold.blueBright );
maintenance.stdout.greenB = ( ...args ) => maintenance.stdout( ...args, ch.bold.bgBlack.greenBright );

module.exports = maintenance;
