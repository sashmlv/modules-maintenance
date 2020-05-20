'use strict';

const ch = require( 'chalk' ),
   fs = require( 'fs' ),
   util = require( 'util' ),
   path = require( 'path' ),
   access = util.promisify( fs.access );

/**
 * Constructor
 * @constructor
 **/
class Maintenance {

	/**
	 * Get type of variable
	 * @param { * } - any value
	 * @return { string } class
	 **/
	getClass( obj ) {

		return {}.toString.call( obj ).slice( 8, -1 ).toLowerCase();
	}

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
      }

      return console.log( str, ...args );
   };

   /**
    * Check file exists
    * @param  {string} filePath
    * @param  {boolean} tryFix
    * @return {boolean} Return file exists
    **/
   async exists( filePath ) {

      try {

         if( tryFix ){

            filePath = path.resolve( filePath );
         }

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
};

const maintenance = new Maintenance();

maintenance.log.red    = ( ...args ) => maintenance.log( ...args, ch.bold.redBright );
maintenance.log.yellow = ( ...args ) => maintenance.log( ...args, ch.bold.yellowBright );
maintenance.log.blue   = ( ...args ) => maintenance.log( ...args, ch.bold.blueBright );
maintenance.log.greenB = ( ...args ) => maintenance.log( ...args, ch.bold.bgBlack.greenBright );

module.exports = maintenance;
