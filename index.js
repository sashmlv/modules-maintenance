'use strict';

const ch = require( 'chalk' ),
      fs = require( 'fs' ),
      util = require( 'util' ),
      access = util.promisify( fs.access );

/**
 * Constructor
 * @constructor
 **/
class Maintenance {

  /**
   * Log
   * @param  {*}
   * @return {undefined}
   **/
   log( str, ...args ) {
      const clb = typeof args[ args.length - 1 ] === 'function' ? args.pop() : undefined;
      if( clb ) {
         args.length && ( args = args.map( v => clb( v )));
         ! args.length && ( str = clb( str ));
      }
      return console.log( str, ...args );
   };

  /**
   * Check file exists
   * @param  {string} filePath
   * @return {boolean} Return file exists
   **/
   async exists( filePath ) {

      try {

         await access( filePath, fs.constants.F_OK );

         return true;
      }
      catch( e ) {

         if( e.code === 'ENOENT' ) {

            return false;
         }

         throw e;
      };
   };
}

const maintenance = new Maintenance();


maintenance.log.red    = ( ...args ) => maintenance.log( ...args, ch.bold.redBright );
maintenance.log.yellow = ( ...args ) => maintenance.log( ...args, ch.bold.yellowBright );
maintenance.log.blue   = ( ...args ) => maintenance.log( ...args, ch.bold.blueBright );
maintenance.log.greenB = ( ...args ) => maintenance.log( ...args, ch.bold.bgBlack.greenBright );

module.exports = maintenance;
