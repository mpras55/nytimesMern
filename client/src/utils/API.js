import axios from "axios";
import $ from "jquery";

const BASEURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const APIKEY = "29ce8207a7f5458aa41cd82e383630a5";
let APIURL = "";


export default {
// Call NYTimes API to GET data
	getNews: function(topic,startDate,endDate) {
		APIURL =  BASEURL + '?' + $.param({
			'api-key': APIKEY,
			'q': topic,
			'begin_date': startDate,
			'end_date': endDate,
			'fl': "pub_date,headline,web_url"
		});
    return axios.get(APIURL);
  },
	// Gets saved news
	getSavedNews: function() {
		return axios.get("/api/news");
	},
	// Deletes the news with the given id
	deleteSavedNews: function(id) {
		console.log(id, "Delete API");
				return axios.delete("/api/news/" + id);
	},
	// Saves a news to the database
	savenews: function(newsData) {
		return axios.post("/api/news", newsData);
	}
};
