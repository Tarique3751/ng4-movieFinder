import { Injectable } from '@angular/core';
import { Jsonp } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class MovieService {

	private apiKey: string = '69705aee3fca5c731bd07fa027719283';

	constructor(private jsonp: Jsonp) {
	}

	getTodayDate() {
	    let today = new Date();
		let day = '' + today.getDate();
		let month = '' + (today.getMonth()+1);
		let year = today.getFullYear();
		if (month.length < 2) month = '0' + month;
    	if (day.length < 2) day = '0' + day;
    	return [year, month, day].join('-');
	}

	getLastMonthDate(){
		let today = new Date();
		let day = '' + today.getDate();
		let month = '' + today.getMonth();
		let year = today.getFullYear();
		if(month == '1')  month = '12', year--;
		if (month.length < 2) month = '0' + month;
    	if (day.length < 2) day = '0' + day;
    	return [year, month, day].join('-');
	}

	getPopular(){
		return this.jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&sort_by=popularity.desc&api_key='+this.apiKey)
		.map(res => res.json());
	}

	getInTheaters(){
		return this.jsonp.get('https://api.themoviedb.org/3/discover/movie?callback=JSONP_CALLBACK&primary_release_date.gte='+this.getLastMonthDate()+'&primary_release_date.lte='+this.getTodayDate()+'&sort_by=popularity.desc&api_key='+this.apiKey)
		.map(res => res.json());
	}

	searchMovies(query: string){
		return this.jsonp.get('https://api.themoviedb.org/3/search/movie?callback=JSONP_CALLBACK&query='+query+'&sort_by=popularity.desc&api_key='+this.apiKey)
		.map(res => res.json());
	}

	getMovie(id: string){
		return this.jsonp.get('https://api.themoviedb.org/3/movie/'+ id +'?callback=JSONP_CALLBACK&api_key='+this.apiKey)
		.map(res => res.json());
	}

}
