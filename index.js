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

maintenance.log.red = function( ...args ) {

   args = args.map( v => ch.bold.redBright( v ));
   maintenance.log( ...args );
};

maintenance.log.yellow = function( ...args ) {

   args = args.map( v => ch.bold.yellowBright( v ));
   maintenance.log( ...args );
};

maintenance.log.blue = function( ...args ) {

   args = args.map( v => ch.bold.blueBright( v ));
   maintenance.log( ...args );
};

maintenance.log.greenB = function( ...args ) {

   args = args.map( v => ch.bold.bgBlack.greenBright( v ));
   maintenance.log( ...args );
};

module.exports = maintenance;
