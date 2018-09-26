/*

	Name:
		translation.js

	Updated:
		- Date:  2018-09-26
		- By:  Jason McNeill
		- Email:  vrtjason@gmail.com

	Created:
		- Date:  2018-09-26
		- By:  Jason McNeill
		- Email:  vrtjason@gmail.com

	Description:
		To enable translated content to appear in an HTML document template, after being retrieved from browser-based storage.

	Dependencies:
		1.  An XML file, with an ISO value of a language in the path:
			- Purpose:  To contain the translations for a particular language
			- Path (required) from the Web root:  /translations/lang/[ISO]/global.xml
			- Example:  /translations/lang/es/global.xml  
			- Possible ISO values:  https://en.wikipedia.org/wiki/ISO_639-1
			- Structure (required; include as many phrases as needed with unique id values):
				<?xml version="1.0" encoding="utf-8"?>
				<global lang-original="en" lang-translated="es" last-updated="2018-09-26" last-updated-by="Jason McNeill" last-updated-by-email="vrtjason@gmail.com" created="2018-09-26" created-by="Jason McNeill" created-by-email="vrtjason@gmail.com">
					<phrase id="1">
						<original>
							Blue
						</original>
						<translated>
							Azul
						</translated>
					</phrase>
					<phrase id="2">
						<original>
							Red
						</original>
						<translated>
							Rojo
						</translated>
					</phrase>
					<phrase id="3">
						<original>
							Green
						</original>
						<translated>
							Verde
						</translated>
					</phrase>
				</global>

		2.  jQuery:
			- Purpose:  To enable client-side data retrieval and DOM manipulation
			- Web:  http://jquery.com/
			- CDN:  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		3.  Localforage:
			- Purpose:  To enable saving and retrieval of content (such as translations) within browser-based storage
			- Web:  https://localforage.github.io/localForage/
			- CDN:  <script src="https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.2/localforage.min.js"></script>

*/

jQuery(document).ready(function($){

	const getLang = function(){
		return new Promise(function(resolve, reject){
			localforage.getItem("lang").then(function(value){
				resolve(value);
			});
		});
	}

	const setLang = function(langObj){
		return new Promise(function(resolve, reject){
			localforage.getItem("lang").then(function(langObj){
				let lang = {
					iso: "es",
					name: {
						en: "Spanish",
						local: "Español"
					}
				};
				if(langObj) lang = langObj;
				return lang;
			}).then(function(langObj){
				localforage.setItem("lang", langObj).then(function(value){
					resolve(value);
				});
			})
		});
	};			

	const phrases2Array = function(phrasesObj){
		let phrasesArr = [];
		for(let i=0; i<phrasesObj.length; i++) {
			let phrase = $(phrasesObj[i]);
			let phraseObj = {
				id: phrase[0].attributes['id'].value,
				original: phrase[0].children[0].textContent.trim(),
				translated: phrase[0].children[1].textContent.trim()
			};
			phrasesArr.push(phraseObj);
		}
		return phrasesArr;
	}

	const setGlobalPhrases = function(){
		getLang().then(function(langObj){
			$.ajax({
				url: '/translations/lang/' + langObj.iso + '/global.xml',
				dataType: 'xml',
				method: 'GET',
				error: function(err){
					console.error(err);
				},
				success: function(data){
					let tag = $(data).find("global")[0];
					let langOriginal = tag.attributes['lang-original'].value.trim();
					let langTranslated = tag.attributes['lang-translated'].value.trim();
					let updatedAt = tag.attributes['last-updated'].value.trim();
					let updatedBy = tag.attributes['last-updated-by'].value.trim();
					let updatedByEmail = tag.attributes['last-updated-by-email'].value.trim();
					let createdAt = tag.attributes['created'].value.trim();
					let createdBy = tag.attributes['created-by'].value.trim();
					let createdByEmail = tag.attributes['created-by-email'].value.trim();
					let phrasesArr = phrases2Array($(tag).find("phrase"));
					let phrasesObj = {
						phrases: phrasesArr,
						langs: {
							original: langOriginal,
							translated: langTranslated
						},
						dates: {
							created: {
								on: createdAt,
								by: {
									name: createdBy,
									email: createdByEmail
								}
							},
							updated: {
								on: updatedAt,
								by: {
									name: updatedBy,
									email: updatedByEmail
								}
							}
						}
					}
					localforage.setItem("globalPhrases", phrasesObj).then(function(result){
						return result;
					});
				}
			});
		})
	};
	
	setLang().then(function(langObj){
		setGlobalPhrases(langObj);
	});

});
