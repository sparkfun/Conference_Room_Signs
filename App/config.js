/*-------- Conference Signs Config File ---------*/

/*--- Name of the Conference Room ---*/
var ROOM_NAME = 'BEBOP';
//var ROOM_NAME = 'MILLENNIUM FALCON';
//var ROOM_NAME = 'PLANET EXPRESS';
//var ROOM_NAME = 'VOYAGER (MAIN)';
//var ROOM_NAME = 'VOYAGER (SMALL)';
//var ROOM_NAME = 'WALLACE';
//var ROOM_NAME = 'GROMIT';
//var ROOM_NAME = 'SPACEBALL 1';

/*--- Google calendar ID of the desired resource ---*/		
switch (ROOM_NAME) {		
	case 'BEBOP':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'MILLENNIUM FALCON':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'PLANET EXPRESS':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'VOYAGER (MAIN)':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'VOYAGER (SMALL)':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'WALLACE':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'GROMIT':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
	case 'SPACEBALL 1':		
		var CALENDAR_ID = '<YOUR GOOGLE RESOURCE ID>';		
		break;		
}

/*--- Path to a background image for the sign ---*/
switch (ROOM_NAME) {
	case 'BEBOP':
		var BACKGROUND_IMG = 'http://www.inetres.com/gp/anime/bebop/09/bebop_09_17.jpg';
		break;
	case 'MILLENNIUM FALCON':
		var BACKGROUND_IMG = 'http://www.gunjap.net/site/wp-content/uploads/2015/11/DSC_0626_zps6x61oybs.jpgoriginal.jpg';
		break;
	case 'PLANET EXPRESS':
		var BACKGROUND_IMG = 'http://net.archbold.k12.oh.us/ahs/web_class/Spring_13/Futurama_Miller/images/page3.Planet%20Express.jpg';
		break;
	case 'VOYAGER (MAIN)':
		var BACKGROUND_IMG = 'http://www.syfy.com/sites/syfy/files/wire/legacy/voyagermain.jpeg';
		break;
	case 'VOYAGER (SMALL)':
		var BACKGROUND_IMG = 'http://www.syfy.com/sites/syfy/files/wire/legacy/voyagermain.jpeg';
		break;
	case 'WALLACE':
		var BACKGROUND_IMG = 'https://cdn.images.express.co.uk/img/dynamic/1/590x/secondary/wallace-580442.jpg';
		break;
	case 'GROMIT':
		var BACKGROUND_IMG = 'http://wallace-and-gromit-2015.s3.amazonaws.com/styles/retina_to_desktop/s3/film_ACS_dtop_1.jpg';
		break;
	case 'SPACEBALL 1': 
		var BACKGROUND_IMG = 'http://assets.sciencefictionarchives.com/images/uploads/objectitemPicture/208/picture/379b.jpg';
		break;
}
